---
title: "Debian packaging with git — Part 1"
date: "2008-05-29"
path: "/debian-packaging-with-git-part-1"
excerpt: "Recently, I've been taking a look at tools to version control and maintain my Debian packages in git. Git, like mercurial, is a distributed SCM used to maintain the Linux kernel since version 2.6.12."
feature_image: "/images/packaging-software.jpg"
---

Recently, I’ve been taking a look at tools to version control and maintain my Debian packages in git.

Git, like mercurial, is a distributed SCM used to maintain the Linux kernel since version 2.6.12. Branching in git is very cheap, and merging is trivial and follows a decentralized model where developers can push and pull code with each other in true distributed fashion.

Of the Debian tools I've tried, the main contenders are:

- gitpkg
- git-buildpackage

gitpkg, is extremely simple to use, and quick to get you off the ground. If you already have an entire revision history of .dsc, .diff.gz files, maintained in the good old fashioned way, gitpkg provides the git-debimport utility that lets you import everything into a git repository in one go. It does this intelligently by applying consecutive revisions and tagging the different versions along the way.

Here are the steps that I took to import my ncc package history into git:

```bash
$ mkdir /git/repo
$ cd /git/repo
$ git-debimport ../../debian/ncc/ncc
```

It will then pick up all the files beginning with ncc in the ../../debian/ncc directory.

To see the revision history:

```bash
$ cd ncc
$ gitk
```

The .orig.tar.gz files will be extracted to a branch called upstream and tagged (v2.5), it will then be merged to master and the .diff.gz files applied sequentially and tagged at each step (v2.5–1). A list of tags like the following will be created:

```
v2.5
v2.5–1
v2.5–2
v2.6
v2.6–1
v2.6–2
```

To create the source package for a particular revision:

```bash
gitpkg v2.6–1 v2.6
```

Where the first argument is the tag with the Debian changes, and the second argument is the tag for upstream code.

```bash
$ ls -F ../deb-packages/ncc/
ncc-2.6/ ncc_2.6–1.diff.gz ncc_2.6–1.dsc ncc_2.6.orig.tar.gz

$ cd ../deb-packages/ncc/ncc-2.6
$ debuild
```

These steps didn't work for me the first time as git silently dropped an empty directory that caused the build to fail. The workaround was to create a** .gitignore** file in the empty directory. This is probably something that gitpkg could be configured to handle.


To upgrade to a new upstream version:

```bash
$ git checkout upstream
$ rm -rf *
$ tar zxvf /path/to/new/upstream.tar.gz
$ git add .
$ git commit -m "Upgrade to v2.7"
$ git tag v2.7

# Merge the Debian changes
$ git checkout master
$ git branch debian
$ git checkout debian
$ git merge upstream

# Fix conflicts / make Debian specific changes / test
$ git add .
$ git commit -a
$ git checkout master
$ git merge debian
$ git tag v2.7–1

# Generate Debian package artifacts
$ gitpkg v2.7–1 v2.7

# Build Debian package
$ cd ../deb-packages/ncc/ncc-2.7
$ debuild
```

A couple of caveats — gitpkg generates the orig.tar.gz by tarring up the upstream branch. As far as I know, gitpkg does not yet have pristine-tar support yet and that's a must-have if you don't want to re-package the upstream sources. I also noticed that git-debimport had trouble with absolute paths, for which I submitted a patch — so I don't have a whole lot of confidence in the tool yet, but it's getting there.
