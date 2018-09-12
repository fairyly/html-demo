# gitlab

Command line instructions

Git global setup
```
git config --global user.name "yourname"
git config --global user.email "youremail"
```

Create a new repository
```
git clone git@115.159.76.241:gic-web/gic-web.git
cd gic-web
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master
```

Existing folder
```
cd existing_folder
git init
git remote add origin git@115.159.76.241:gic-web/gic-web.git
git add .
git commit -m "Initial commit"
git push -u origin master
```

Existing Git repository
```
cd existing_repo
git remote rename origin old-origin
git remote add origin git@115.159.76.241:gic-web/gic-web.git
git push -u origin --all
git push -u origin --tags
```
