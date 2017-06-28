# Gulp config (修改源码方案不利于维护)

## gulp自动化添加版本号
- 1. 修改js和css文件
- 2. 通过对js,css文件内容进行hash运算，生成一个文件的唯一hash字符串(如果文件修改则hash号会发生变化)
- 3. 替换原html中的js,css文件名，生成一个带版本号的文件名

- 原结构下html文件代码
```
<link rel="stylesheet" href="../css/style.css">
<script src="../js/index.js"></script>
```
- 要达到的效果：在原结构下html文件代码
```
<link rel="stylesheet" href="../css/style.css?v=0d83247610">
<script src="../js/index.js?v=61c1ef9f34"></script></br>
```
### 安装gulp和gulp插件
```
npm install --save-dev gulp
npm install --save-dev gulp-rev
npm install --save-dev gulp-rev-collector
npm install --save-dev run-sequence
```
### 编写gulpfile.js
```
//引入gulp和gulp插件
var gulp = require('gulp'),  
    runSequence = require('run-sequence'),   
    rev = require('gulp-rev'),    
    revCollector = require('gulp-rev-collector');

//定义css、js文件路径，是本地css,js文件的路径，可自行配置
var cssUrl = 'app/css/*.css',   
    jsUrl = 'app/js/*.js';

//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function(){   
  return gulp.src(cssUrl)        
  .pipe(rev())        
  .pipe(rev.manifest())        
  .pipe(gulp.dest('app/rev/css'));
});

//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function(){    
  return gulp.src(jsUrl)        
  .pipe(rev())        
  .pipe(rev.manifest())        
  .pipe(gulp.dest('app/rev/js'));
});

//Html更换css、js文件版本
gulp.task('revHtml', function () {    
  return gulp.src(['app/rev/**/*.json', 'app/views/*.html'])  /*WEB-INF/views是本地html文件的路径，可自行配置*/        
  .pipe(revCollector())        
  .pipe(gulp.dest('app/'));  /*Html更换css、js文件版本,WEB-INF/views也是和本地html文件的路径一致*/
});

//开发构建
gulp.task('dev', function (done) {   
  condition = false;   
  runSequence(       
  ['revCss'],       
  ['revJs'],        
  ['revHtml'],        
  done);
});
gulp.task('default', ['dev']);
```

### 修改gulp-rev和gulp-rev-collector文件中index.js
- 修改项目中node_modules\gulp-rev\index.js
```
function transformFilename(file) {
	// save the old path for later
	file.revOrigPath = file.path;
	file.revOrigBase = file.base;
	file.revHash = revHash(file.contents);

	file.path = modifyFilename(file.path, function (filename, extension) {
		// var extIndex = filename.indexOf('.');

		// filename = extIndex === -1 ?
		// 	revPath(filename, file.revHash) :
		// 	revPath(filename.slice(0, extIndex), file.revHash) + filename.slice(extIndex);//注释原代码中这些部分;

		return filename + extension;
	});
}
//以及
plugin.manifest = function (pth, opts) {
	if (typeof pth === 'string') {
		pth = {path: pth};
	}

	opts = objectAssign({
		path: 'rev-manifest.json',
		merge: false,
		// Apply the default JSON transformer.
		// The user can pass in his on transformer if he wants. The only requirement is that it should
		// support 'parse' and 'stringify' methods.
		transformer: JSON
	}, opts, pth);

	var manifest = {};

	return through.obj(function (file, enc, cb) {
		// ignore all non-rev'd files
		if (!file.path || !file.revOrigPath) {
			cb();
			return;
		}

		var revisionedFile = relPath(file.base, file.path);
		var originalFile = path.join(path.dirname(revisionedFile), path.basename(file.revOrigPath)).replace(/\\/g, '/');

		manifest[originalFile] = revisionedFile + '?v=' + file.revHash;//新加版本号 + '?v=' + file.revHash

		cb();
	}, function (cb) {
  //修改这个函数中的	manifest[originalFile] = revisionedFile + '?v=' + file.revHash;
```
- 修改项目中node_modules\gulp-rev-collector\index.js
```
function _getManifestData(file, opts) {
    var data;
    var ext = path.extname(file.path);
    if (ext === '.json') {
        var json = {};
        try {
            var content = file.contents.toString('utf8');
            if (content) {
                json = JSON.parse(content);
            }
        } catch (x) {
            this.emit('error', new PluginError(PLUGIN_NAME,  x));
            return;
        }
        if (_.isObject(json)) {
            var isRev = 1;
            Object.keys(json).forEach(function (key) {
                if (!_.isString(json[key])) {
                    isRev = 0;
                    return;
                }
                let cleanReplacement =  path.basename(json[key]).split('?')[0];//替换原path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' );//
                if (!~[
                        path.basename(key),
                        _mapExtnames(path.basename(key), opts)
                    ].indexOf(cleanReplacement)
                ) {
                    isRev = 0;
                }
            });

            if (isRev) {
                data = json;
            }
        }

    }
    return data;
}
```
# 不修改源码 修改版本号

```
//引入gulp和gulp插件
  var gulp = require('gulp'),  
  runSequence = require('run-sequence'),   
  rev = require('gulp-rev'),    
  revCollector = require('gulp-rev-collector'),
  bump = require('gulp-bump'),
  clean = require('gulp-clean');
  var gutil   = require('gulp-util');
  var through = require('through2');
  var path    = require('path');

  // var getHashes = function() {
  //   var hashes = {};

  //   // Note that we're not emitting the files here... this consumer effectively
  //   // stores the rev hashes then swallows the entire pipeline.
  //   var collect = function(file, enc, cb) {
  //     if (file.revHash) {
  //       var l = file.revOrigPath.split('\\');
  //       // console.log(l[l.length-1]);
  //       hashes[l[l.length-1]] = l[l.length-1]+"?v="+file.revHash;
  //     }
  //     // console.log(hashes);
  //     return cb();
  //   };

  //   // Once the stream is finished, we'll emit a single "hashes.json" file...
  //   var emit = function(cb) {
  //     var file = new gutil.File({
  //       // base: path.join(__dirname, 'app'),
  //       // cwd:  __dirname,
  //       path: path.join(__dirname, '/hashes.json')
  //     });

  //     console.log(file);

  //     file.contents = new Buffer(JSON.stringify(hashes));
  //     this.push(file);

  //     return cb();
  //   };

  //   return through.obj(collect, emit);
  // };
  

//定义css、js文件路径，是本地css,js文件的路径，可自行配置
  var cssUrl = 'app/views/css/*.css',   
  jsUrl = 'app/views/js/*.js';


// CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
  gulp.task('revCss', function(){   
    return gulp.src(cssUrl)        
   .pipe(rev())
   .pipe(gulp.dest('app/css/'))
   .pipe(rev.manifest())       
   .pipe(gulp.dest('app/rev/css'));
  });

// js生成文件hash编码并生成 rev-manifest.json文件名对照映射
  gulp.task('revJs', function(){    
    return gulp.src(jsUrl)        
   .pipe(rev())
   .pipe(gulp.dest('app/js/'))
   .pipe(rev.manifest())      
   .pipe(gulp.dest('app/rev/js'));
  });

// gulp.task('up',function() {
//   gulp.src('app/rev/css/rev-manifest.json')
//     .pipe(bump())
//     .pipe(gulp.dest('rev/'));
// })

gulp.task('cleanfile', function() {  
    return gulp.src(['app/js/*.js','app/css/*.css'])
    .pipe(clean({force: true}));
});

 //Html更换css、js文件版本
   gulp.task('revHtml', function () {    
   return gulp.src(['app/rev/**/*.json', 'app/views/*.html'])  /*/views是本地html文件的路径，可自行配置*/        
  .pipe(revCollector({
        replaceReved: true
  }))        
  .pipe(gulp.dest('app/'));  /*Html更换css、js文件版本,views也是和本地html文件的路径一致*/
 });

//开发构建
  gulp.task('dev', function (done) {   
  condition = false;   
  runSequence( 
  ['cleanfile'],
  ['revCss'],
  ['revJs'],    
  ['revHtml'],        
  done);});
  gulp.task('default', ['dev']);
  
```

