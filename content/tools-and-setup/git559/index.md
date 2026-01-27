---
title: "Git and GitHub in CS559"
date: 2021-01-10T10:37:42-06:00
draft: false
categories: ["tools"]
tags: [git,tools]
weight: 5
---

In CS559 this semester, we will use GitHub as a mechanism for distributing framework code (the starter code for assignments) as well as to have students hand in their assignments.

If you've never used Git, some of this might not make sense yet, since we are using Git terminology. See {{% anchorlink "Learning Git and GitHub" %}} below for help in getting started.

<!--more-->

Learning enough about Git is a requirement for the class. Technically, knowing the basics of Git is a pre-requisite (since it is covered in CS400). However, we will help you learn.

## Overview / Summary

If you don't know what some of these things mean, read the rest of this page.

1. Every student must register for a GitHub account at [https://github.com](https://github.com). You can use one that you already have.
2. You should learn the basics of using Git. Know the concepts of a repository, cloning, committing, pulling and pushing. For class you won't be required to use any of the fancier features (although you might want to).
3. We will require all students to specify what their GitHub account is.
4. The course will use GitHub Classroom that will create private repositories for each student for each assignment.
5. Students are required to clone their private repository on GitHub to start each assignment. They must commit their work (including adding any files that they need to add). We recommend that students commit their work often, so there is a record of progress. To turn things in, students must push things back to their private repository on GitHub and use the submit mechanism (new for 2026).

## How things will work

The basic idea is:

1. We will provide a GitHub classroom link as part of a module introduction survey. Each student will access the link. When they do, a private GitHub repository containing the assignment "starter" will be created for them. Each student will get their own private repository. **Warning:** you need to accept the invitation to the repository. *You will get an a Repository Access Issue.* Once you accept the invitation you can access your repository.
2. Each student clones their repository to their computer as the starting point for their assignment.
3. Each student works on their assignment, using their repository as they want. They commit different versions, create clones, push and pull, etc.
4. When the student completes their assignment, they push to the classroom repository. The version they wish to have graded should be the "master" branch.
5. (new for 2026) Student must use the "submit button" embedded in the workbook after they have pushed their final version to signal that their workbook is ready to be graded.
6. The course staff (TA/Grader) will clone the student repository in order to grade it. This will happen shortly after the due date. If you push new versions after this cloning is done, we will not see it.

GitHub classroom will make _private_ repositories for each student for each assignment. These are repositories that only the student and course staff can access.

If you use advanced Git features, you need to have things such that the grader can find the right version to grade. The grader will grade the default (origin/master) branch.

## How GitHub Classroom Works

Understanding how GitHub classroom works will make everything else easier.

GitHub classroom provides a thin layer over regular GitHub to automate the creation and retrieval of a large number of similar repositories.

For each assignment, GitHub Classroom will make a special URL link. When you go to this link, it will create a private repository for you. The repository will have the name "AssignmentName-GitHubID". This repository is a clone of the starter repository. The repository is a private repository owned by the course staff (so we can view it) that the student will have write access to it.

**A warning:** GitHub will invite you to this new repository. This invitation is *separate* from GitHub classroom to create the repository. GitHub will send you email to accept the invitation to the repository. Or, you can look at your pending invitations (the mailbox icon in the upper right corner of the page on `github.com`) and accept through your notifications.

{{<resource-image src="access-issue.png">}}

After you create the repository, you will get a "Repository Access Issue". You will get this any time you try to access the repository before you accept your invitation to it. You must accept the invitation in order to access the repository.

GitHub classroom creates repositories for any GitHub user ID that requests one. It does not necessarily associate anything with student ID or person. Students tell the course staff what their GitHub user ID is, and we keep a list to associate it with your University info.

The student uses this created repository to create their assignment. Generally, this will involve cloning the repository to the computer you work on (e.g., your laptop), editing the files and adding new ones, committing the changes (to your local repository), and pushing these changes back to the repository Classroom created.

This is summarized in the tutorial videos: 
[Git Video Part A: What it looks like to do a workbook](https://mediaspace.wisc.edu/media/Git2021A+-+CS559+GitHub+++GitHub+Classroom+Tutorial+-+Part+A+/1_ovi963q3) [(Part A Slides)](https://cs559.github.io/LectureNotesPDFs/2021/2021-git-A-git-for-workbooks-post.pdf) 
[Git Video Part B: Basics of GIT and GitHub Classroom](https://mediaspace.wisc.edu/media/Git2021B+-+CS559+GitHub+++GitHub+Classroom+Tutorial+-+Part+B/1_yel4ct2z)
[(Part B Slides)](https://cs559.github.io/LectureNotesPDFs/2021/2021-git-B-how-git-works-post.pdf).

## Class Policies

1. All students must have a GitHub account.
2. Each student needs to use their own GitHub account.
3. Students should use the same GitHub account for the entire class. If you need to change your GitHub ID for some reason, contact the course staff.
4. Students must provide information so we know how to connect them with their GitHub account.

## Some Warnings

The links we will provide for assignments will create new repositories for any GitHub user that wants to create a repository. Please do not share the link with anyone outside of class.

There is no checking to make sure that the correct repositories are connected to the correct student IDs.

It is your responsibility to make sure your repository is correctly associated with your student ID (so we know who you are). If there is any problem, please talk to the course staff. Basically, GitHub uses your GitHub ID for everything, and we need to keep a list that associates GitHub IDs to students.

You must accept the invitation to join your repository. You should get an invitation (from GitHub) by email. You can also accept the invitation from the "notifications" on `github.com`.

You need to make sure you commit all your code into the repository - including adding new files that you make.

You need to make sure that you push all of your assignment into your repository. We recommend committing and pushing regularly since the repository can serve as a backup in case something bad happens to your local copy.

It is your responsibility to check that your repository is correct for hand-in. You can do this by making a fresh clone of it - you'll see exactly what the grader will see.

The repositories may be removed at the end of the semester. If you want to keep a copy of your work, make sure that you clone the repository someplace other than the repository we give you.

We recommend that you set up SSH authentication to access GitHub from the computer you will work on. See {{% link "git-ssh" %}}.

**Do not use the "Download" button in GitHub!** That will create a copy that cannot be pushed back for handin.

## Learning Git and GitHub

The basic ideas of using Git should be a review - since you should have learned about it in CS400 (or elsewhere). However, you may want to look through this tutorial to get some specific ideas on how to use Git specifically in CS559, and for some practical pointers.

If you're an experienced Git user, nothing here should be a surprise.

If you haven't used Git before, it does take a little getting used to. Git has a lot of cool features - but for class, we will only need the basics.

The brief tutorial below can help you get started, but you might want to check out other resources. The [Git - The Simple Guide](http://rogerdudler.github.io/git-guide/) has been recommended as an easy way to get started. The book "Pro Git" is available [online](https://git-scm.com/book/en/v2/) - the whole thing is overkill, but the first chapters will give you a good idea of the most important features of Git.

In the past, we made a video tutorial to help students get started. We recommend watching it as it covers not only the basics of GIT, but some of the details of how we use it in class.

+ [Git Video Part A: What it looks like to do a workbook](https://mediaspace.wisc.edu/media/Git2021A+-+CS559+GitHub+++GitHub+Classroom+Tutorial+-+Part+A+/1_ovi963q3) -  [(Part A Slides)](https://cs559.github.io/LectureNotesPDFs/2021/2021-git-A-git-for-workbooks-post.pdf)
+ [Git Video Part B: Basics of GIT and GitHub Classroom](https://mediaspace.wisc.edu/media/Git2021B+-+CS559+GitHub+++GitHub+Classroom+Tutorial+-+Part+B/1_yel4ct2z) -  [(Part B Slides)](https://cs559.github.io/LectureNotesPDFs/2021/2021-git-B-how-git-works-post.pdf)

### A Brief Tutorial

**Git vs. GitHub** - _Git_ is a source code control system. _GitHub_ is a company that provides a server where people can have accounts and store stuff (repositories). GitHub (the server) is often used to share code publicly. However, our class account has the ability to make private repositories (which is why we make the repos for you).

**Basic Idea:** When you work on a project (even without source control), everything is in a _working directory._ The working directory (WD) might have subdirectories. Some of the files in the working directory will be _tracked_ - that means that we care about them and will want to keep copies.

The basic idea of source control (including Git) is that we'll keep making multiple backups of our working directory (or at least the tracked files). If something goes wrong, we can always restore one of those backups. Source control keeps all backups (we call them versions).

The key concept for Git is a **repository** (or "repo" for short). It's basically the collection of all the backups of your project directory (or, at least the files that you told it to back up). In addition to the current version, you can keep lots of past versions. If you're wondering if its wasteful to keep lots of versions, don't worry - Git is very efficient.

What makes Git different than most other source control systems is that we will copy around the whole repository. When you give someone your project (the repo) they will copy the whole repo - which means they get all the past versions.

So, with Git, there can be multiple copies of the repository. You might have one on your laptop, another copy of the repo on a desktop computer, and yet another copy stored on GitHub. This is good because if your laptop breaks, there are backups. It also allows a team to work together: everyone has their own copy of the repo.

The tricky part is that if you work on one copy of the repository, it will have different versions than the other copies. So you will periodically need to synchronize so that different repos have the same contents (versions of the project). The two git commands for this are **pull** which gets the changes from another repository and **push** which sends the information in your repository to the remote one.

The basic Git operations are:

+ **clone** - which copies a repository (e.g., from GitHub to your laptop)
+ **add** - which tells Git that you want to track a file (i.e., that when you make a backup, it should include this file)
+ **commit** - which is the "backup" command - it stores a version of all of the files. Note that it stores it in the local repository. If you want to put this version somewhere else (like the repository on the GitHub server), you need to **push** it. When you commit, you need to "stage" (which basically tells commit which files you want to make a backup of).
+ **checkout** - which is the restore command - it switches back to a previous version (e.g., that you committed)
+ **push** - which puts information from your repository into a remote (to synchronize them)
+ **pull** - which gets information from a remote repository into yours

There are some subtleties and fancier features, but this is enough to get started. So, for class the basic workflow is:

+ We provide you with a GitHub classroom link. When you follow this link, GitHub classroom will make a GitHub repo for you.
+ You **clone** this repo to your laptop
+ You do some work
+ You **commit** the changes you made to the project
+ You do some more work
+ You **commit** the changes you made to the project
+ You **add** files if you created new ones in the project
+ You **push** the changes back to your remote repo on GitHub
+ You do some more work
+ You **commit** your work
+ You **push** your changes to the GitHub Repo
+ repeat until done
+ You press the *submit* button in the workbook to let us know your assignment is ready for grading.
+ The grader / TA / instructor clones your repo from GitHub so they have a copy to look at/grade.

Note that this is a simplified workflow, assuming no one else is using your repo, and you only are working on one computer. If you need to coordinate with multiple people or work on multiple computers (each with their own repo), you need to use more Git commands.

### GitHub security

When you log into your account on GitHub using your web browser, you use a password. Web browsers have protocols to send passwords in secure ways. If you really care about security, you can even use two factor authentication.

The problem is when some other program (not your web browser) - like the GIT command line client - needs to access your repositories on GitHub.

Approach one is to have the program pretend it's a web browser and send your password (they way a web browser does). This has the downsides that you need to type your password all the time and it doesn't work with two factor authentication. And there are some other reasons why security folks dislike it.

Note: if you are referring to a repository using a web URL, like `https://github.com/cs559-sp20/wb01-gleicher.git`, you are using the "https protocol" (the password version of authentication).

The preferred approach is using an SSH public/private key pair. The public key is something that you give to GitHub. The private key is something that you keep on your computer. When your computer needs to talk to GitHub (using a program like the GIT command line), GitHub checks that your private key works with the public key you have given it already.

Note: links to repositories using SSH look like: `git@github.com:cs559-sp20/wb01-gleicher.git` (they don't look like web URLs).

Getting SSH to work with GIT takes a little effort - but it is worth it. It makes everything a lot simpler. You need to do it once, preferably at the beginning of the semester. See {{< link "git-ssh" >}}

### Some Git Hints

GUI tools (we recommend SourceTree or GitHub Desktop) can be convenient. You can also use the Git tools inside of Visual Studio Code (or some other IDE). However, you should have (and probably be able to use) the command line tools.

It is important to set up SSH authentication (see {{% link "git-ssh" %}}).

You should commit often. Saving your work periodically lets you go back to see what you did, and gives a trail of your progress.

When you commit, leave a meaningful comment - that way you'll know which commit is which, so you will know which one to go back to if you need to.

Don't forget to **add** new files when you add new files to the project.

Be careful with **add**: Git uses `add` for both adding new files and staging files that it already knows about. Be careful not to `add` files that you don't want git to keep track of.

If you **push** to GitHub periodically, you'll have a backup in case some disaster happens to your laptop.

Don't use fancier Git features unless you know what you're doing. They are cool, but they are mainly useful when you are working on a team.

## Why are we doing this?

Using Git / GitHub / GitHub classroom is a useful addition to class for a number of reasons:

+ It encourages students to use source control for their projects, which is important. The projects are big enough, that you don't want to lose your work by accidentally making a mistake or something.
+ It provides students with experience working with source control (and Git specifically), which is a useful skill for the real world.
+ It provides a uniform mechanism for handing in complex projects with complex directory structures.
+ It provides a mechanism to share intermediate versions with course staff so that we can help students.
+ It provides a mechanism for students to share their development history in the event there is questions of the provenance of their assignments.
+ It provides a mechanism so that students can check that they have turned in the correct files. They can clone the repository (just as the course staff will) to see what the course staff will see.
+ It provides a mechanism for us to distribute the starter code to everyone.
+ It provides a mechanism for us to share updates to the starter code if we need to.
+ By forcing people to start with the starter code, we can enforce naming conventions. This will make it easier for students to follow the project rules.
+ By forcing students to start with the starter code, we discourage people from starting by copying someone else's assignment.
+ It provides a mechanism for time stamps - if something goes wrong and a file isn't handed in correctly, we can look at its history in the repository.

## Some Extra Notes

Some notes on GitHub Classroom and GitHub ...

Here are some notes on what happens with GitHub classroom that might help debug problems when things do not work as expected ...

{{< expand "GitHub Classroom Debugging Tips" >}}

1. When you click on the GitHub classroom link for an assignment, it will take you to a page that will create a repository for the logged in user. Make sure you are logged in to GitHub correctly. GitHub classroom uses your GitHub credentials. It will tell you the repository it will create (it has your GitHub user name in it) so you can check that it is correct. Check it before you click "Accept this assignment".

2. Once you click the "Accept this assignment button" to have GitHub classroom create the repository, it may take some time for the actual repository to be created and prepared. The way that this work internally on their server is a little weird. It queues your request (so if the server is busy, it can take some time) and then does several different steps sequentially (creates the repo, provides access permissions, adds the starter code), so you might need to wait until all the steps complete. During this process, the web page will say "We're configuring your repository now. This may take a few minutes to complete. Refresh this page to see updates." Sometimes it takes seconds, sometimes it takes hours.

3. GitHub classroom will send you email when your repository is ready. So you don't have to sit around  waiting for it.

4. You can't see the settings - even for your private repository. But, if you were to look at it, you would see you that the repository is private and that you are a collaborator with write access.

5. If you go back to the GitHub classroom link, it should tell you that you already accepted the assignment. If you have accepted the assignment once, you cannot accept it again. It should tell you "You accepted the assignment, ..." and give you a link to the repository. If it doesn't, things have gone wrong.

6. If there is a repository for your user name, GitHub classroom will not create another one. If you would like to "reset" and start over, a course staff member can delete your repository. Once your repository is deleted, you can make a new one (going back to step 1). We don't need to do this often, but sometimes it is the only way to fix a problem when it comes up.

7. Be careful not to "leave" the organization. If a student accidentally presses the "leave" button (for the repository or the organization) it causes all kinds of problems. If you do this, contact the course staff (via Piazza) and be clear that you have left the repository or organization. Make sure to state what your github user name is in the Piazza post. We can try to fix things. We may not be able to give you access to any work you had done previously on prior workbooks.

For course staff: (students cannot do this)

1. **Staff** can go to the organization (e.g., <https://github.com/CS559-Spring26>) and search for it to see if the students repository is there. If it isn't there, recommend the student tries to create it again (by going to the GitHub classroom link). See if the student has a different GitHub account that they used by mistake.

2. **Staff** has access to the students repositories you can go to them to look at them. If it's there, you can check that it has been properly set up with the starter code. You can look into settings and check that the repository is private and that the student is listed as a collaborator.

3. If there is something wrong in #2, a **Staff** member can fix this manually, but often it is easier to delete the repository and have the student start again. Do this if the student hasn't started working on it yet.

{{< /expand >}}
