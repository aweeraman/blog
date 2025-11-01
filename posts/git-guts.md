---
title: "Git guts"
date: "2013-01-14"
path: "/git-guts"
excerpt: "Today I will dive into the guts of git to showcase the simplicity and elegance in which git manages the content internally in it's own content addressable file system."
feature_image: "/images/git-version-control.jpg"
---

Today I will dive into the guts of git to showcase the simplicity and elegance in which git manages the content internally in it’s own content addressable file system. Armed with this knowledge, you will be able to get a deeper understanding of the underlying data structure to help you figure out and troubleshoot issues that may inevitably come up as you use git.

To start, I shall create a new directory and initialize git.

```bash
$ mkdir git-guts
$ cd git-guts
$ ls -a
. ..
$** git init**
```

Initialized empty Git repository in /Users/anuradha/dev/workbench/git-guts/.git/
```bash
$ ls -a
. .. .gitAt this point, there are no files under version control yet. Here are the files that have been created during initialization:
```


.git
.git/branches
.git/config
.git/description
.git/HEAD
.git/hooks
.git/hooks/applypatch-msg.sample
.git/hooks/commit-msg.sample
.git/hooks/post-commit.sample
.git/hooks/post-receive.sample
.git/hooks/post-update.sample
.git/hooks/pre-applypatch.sample
.git/hooks/pre-commit.sample
.git/hooks/pre-rebase.sample
.git/hooks/prepare-commit-msg.sample
.git/hooks/update.sample
.git/info
.git/info/exclude** .git/objects
.git/objects/info
.git/objects/pack
.git/refs
.git/refs/heads
.git/refs/tags **Of these, the hooks are boilerplate and none are yet active. To make them active, they need to be renamed to remove the .sample suffix.

In this post, I shall focus on the .git/objects directory, as that is where all the content is stored as hashed “objects”. To show what happens, let’s add a file to source control and observe the changes:

```bash
$ echo “bar” > foo
$ git add foo
$ git commit -m “initial commit”
[master (root-commit) 64f3e97] initial commit
 1 files changed, 1 insertions(+), 0 deletions(-)
 create mode 100644 foo
$ find .git/objects/ -type f** .git/objects/57/16ca5987cbf97d6bb54920bea6adde242d87e6
.git/objects/64/f3e9762509b0ce9cbb252f69847957e5368632
.git/objects/6a/09c59ce8eb1b5b4f89450103e67ff9b3a3b1ae **Adding a single file to the repository caused the creation of three objects. Each object is uniquely identified by a 40-character SHA-1 hash of its content, which brings us to one of the key aspects of git, which is that it’s nearly impossible to alter the contents of any single file without causing a change to the cryptographic hash, and unlike version control systems that pre-date this approach of cryptographically ascertaining the integrity of the content, it’s quite hard to tamper with the file or maliciously change history. This coupled with the ability to sign tags using a private key adds an additional level of authenticity and non-repudiation to the release process.
```


Let’s analyze the three types of objects. To see the type of object, the git cat-file -t HASH command can be used. It shows that the three types of objects are:

- blob
- commit
- tree
To see the contents of each file, the git cat-file -p HASH command can be used as shown below:

```bash
$ git cat-file -p 5716ca5987cbf97d6bb54920bea6adde242d87e6
barThis is the first of the three objects, which is the “blob”. It is the actual contents of the file. Note that the file is addressable using the hash, making this structure a content-addressable filesystem. But you may wonder, how does git know what the file name is? This object is only named by the hash. I will get to that shortly.
```


Let’s look at the next object.

```bash
$ git cat-file -p 64f3e9762509b0ce9cbb252f69847957e5368632** tree 6a09c59ce8eb1b5b4f89450103e67ff9b3a3b1ae**
author Anuradha Weeraman 1358159197 +0530
committer Anuradha Weeraman 1358159197 +0530initial commitThis is the “commit” object, which is also stored as an object in the file system. Note that there are two fields for the author and the committer, since the two can be different individuals in the case of a large distributed development project. This way original contributions are acknowledged and not lost during the merging and contribution incorporation process. This file also has a hash reference to the commit “tree”. Let’s look at the tree object next.
```


```bash
$ git cat-file -p 6a09c59ce8eb1b5b4f89450103e67ff9b3a3b1ae
100644 blob 5716ca5987cbf97d6bb54920bea6adde242d87e6** foo **This is the last of the three objects, which is the “tree” object. It contains a descriptor of all the files that are part of the commit. It does that by taking the information from the staging area / index and creating an object at the time of the commit. It shows the permissions of the file in a somewhat different format to the standard UNIX file permissions; the last three digits tells you what the permissions of the file was at the time it was committed. The line also indicates the hash of the blob followed by the name of the file. This is how git knows what the blob should be called in the file system when the code is checked out.
```


Let’s also take a look at what the HEAD of the tree is pointing to:

```bash
$ cat .git/HEAD 
ref: refs/heads/master
$ cat .git/refs/heads/master 
64f3e9762509b0ce9cbb252f69847957e5368632It now has a reference to the last “commit” object. So when you clone or pull down master, git knows what the last commit was introduced into the repository.
```


All I’ve described so far was a single commit. How does git keep track of the history and the commit graph based on this structure, you might wonder. Let’s make a change to the foo file and commit it.

```bash
$ echo foo > foo
$ git add foo
$ git commit -m “Second commit”
[master 2c8200f] Second commit
 1 files changed, 1 insertions(+), 1 deletions(-)
$ find .git/objects -type f** .git/objects/20/5f6b799e7d5c2524468ca006a0131aa57ecce7
.git/objects/25/7cc5642cb1a054f08cc83f2d943e56fd3ebe99
.git/objects/2c/8200f75860bede9aaa0c156c133d15fa418bd5**
.git/objects/57/16ca5987cbf97d6bb54920bea6adde242d87e6
.git/objects/64/f3e9762509b0ce9cbb252f69847957e5368632
.git/objects/6a/09c59ce8eb1b5b4f89450103e67ff9b3a3b1aeThere are three new objects in the system now, a new blob, a tree, and a commit. The blob and tree objects are similar to the ones discussed earlier, but there’s a change to the commit object:
```


```bash
$ git cat-file -p 2c8200f75860bede9aaa0c156c133d15fa418bd5
tree 205f6b799e7d5c2524468ca006a0131aa57ecce7** parent 64f3e9762509b0ce9cbb252f69847957e5368632**
author Anuradha Weeraman 1358161997 +0530
committer Anuradha Weeraman 1358161997 +0530Second commitIt references the parent commit. This way the entire commit graph can be traversed and mapped using these commit objects. The .git/refs/heads/master file is updated to refer to the latest commit. git reflog is a very useful tool which shows the updates to the HEADs over time and can be used to diagnose issues which you might otherwise consider unrecoverable. Git is very protective of data so it’s actually quite hard to lose data, unless you manually trash the object repository. In most occasions, it may turn out to be a dangling unreferenced commit which you can track down using git reflog and recover it. Here’s [a post that explains this process](http://gitready.com/advanced/2009/01/17/restoring-lost-commits.html) for those who are interested.
```


Now, to make things a little more interesting and to create some awareness of what the git utilities are doing behind the scenes to make our lives easy, let’s create these objects manually using a few low level commands with the help of this new knowledge that we just acquired. For the purpose of this exercise, I will create a brand new repository and initialize git.

Let’s create the blob object for the file “foo” with the content “bar” as in the original example:

```bash
$ echo bar | git hash-object -w — stdin
5716ca5987cbf97d6bb54920bea6adde242d87e6The -w switch tells git to write the object to the repository, and — stdin instructs it to read the contents from standard input. It then outputs the hash of the object that it just created.
```


Let’s look at the repository to see if it really was created:

```bash
$ find .git/objects -type f
.git/objects/57/16ca5987cbf97d6bb54920bea6adde242d87e6So far git has been telling us the truth.
```


Now, let’s create a tree object. Since git relies on the index, or the staging area in order to determine the contents of the tree, we will use the git update-index command to set things up in the staging area. Note that the current directory is still empty, there is no “foo” file in the current directory. It’s only available as a hashed object inside .git, and still .git doesn’t know it’s called “foo”. To update the staging area to write the tree object:

```bash
$ git update-index — add — cacheinfo 100644 5716ca5987cbf97d6bb54920bea6adde242d87e6** foo **This is equivalent to performing git add foo. Now git knows the file name of the object, but the tree object is not yet written to the object repository. To do that:
```


```bash
$ git write-tree
6a09c59ce8eb1b5b4f89450103e67ff9b3a3b1aeThis writes the tree object, and returns its hash. Let’s look at the file system again:
```


```bash
$ find .git/objects -type f
.git/objects/57/16ca5987cbf97d6bb54920bea6adde242d87e6** .git/objects/6a/09c59ce8eb1b5b4f89450103e67ff9b3a3b1ae**
$ git cat-file -p 6a09c59ce8eb1b5b4f89450103e67ff9b3a3b1ae
100644 blob 5716ca5987cbf97d6bb54920bea6adde242d87e6** foo **Still, the repository does not contain a “foo” file. Right now these objects are dangling, as there’s no commit object referencing them. It’s not possible to checkout a copy of the foo file yet. Let’s create the commit object now:
```


```bash
$ echo “initial commit” | git commit-tree 6a09c5
c3352776341945bcdddd400d3765635bb2be5671The short hash of the tree object and optionally and preceding commits are passed in as arguments to the git commit-tree command which returns the hash of the commit object. At this point the repository still has no idea what the last commit was, so performing the git log command would result in an error:
```


```bash
$ git log
fatal: bad default revision ‘HEAD’To fix this:
```


```bash
$ echo c3352776341945bcdddd400d3765635bb2be5671 > .git/refs/heads/masterLet’s look at the log again:
```


```bash
$ git log
commit c3352776341945bcdddd400d3765635bb2be5671
```

Author: Anuradha Weeraman
Date: Mon Jan 14 18:06:51 2013 +0530initial commitThere you have it. Git now recognizes your last commit.

If you now list the directory where you initialized the git repository, you would not notice any files, since all these objects were created directly in the git object repository. Now that we have created the commit object and the log shows the last commit, we’re able to load the file into the directory to create a working copy. The way we do that is by resetting the contents of the repository to the HEAD which points at the latest commit.

To illustrate this more clearly:

```bash
$ ls -a
. .. .git** (empty directory)**
$** git reset — hard**
```

HEAD is now at c335277 initial commit
```bash
$ ls -a
. .. .git** foo**
$ cat foo
barand Voila.
```


Hope this helps, and you now have a better understanding of the git guts.
