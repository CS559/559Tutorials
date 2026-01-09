---
title: "Git Setup and SSH configuration"
date: 2021-01-20T12:20:35-06:00
draft: false
categories: ["tools"]
tags: ["git",tools]
weight: 7
toc: true
---

In order to complete your assignments in CS559, you will need to use Git to send files back and forth to GitHub. We recommend that you install proper tools and use SSH authentication - it takes some time to set up, but it makes everything so much easier.

<!--more-->

This page contains our "canonical" instructions for setting up Git with SSH. While experienced Git users are welcome to use it however they prefer, following these instructions will make it much easier for us to help you if something goes wrong.

See {{% link "git559" %}} for information on how to use Git and the role it plays in this class.


## First-time setup instructions

### Installing Git

The simplest way of installing Git on Windows is via [*Git for Windows*](https://git-scm.com/download/win). Similar download options are also available [for Mac](https://git-scm.com/download/mac) - although most Macs have GIT from one place or another. The *Git for Windows* installer has many configuration options - we recommend accepting all of the defaults, unless you have an informed reason to do otherwise.

The *Git for Windows* installer will install Git Bash, a command line terminal that provides a Linux-like experience. You will need to use Git Bash to set up SSH authentication on Windows.

### Setting up SSH authentication

In order to clone and push private repositories on GitHub, you will need to set up SSH authentication.

We strongly suggest following the numbered steps in [the official GitHub documentation](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) exactly as written.

* If you are on Windows, make sure to use Git Bash, *not* the Windows command prompt.

The last step in these instructions is to [add your SSH key to your GitHub account](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account). (If you do not already have a GitHub account, you will need to create one.) Once this is done, you will be ready to use Git in CS559.

If you experience any issues with Git authentication after following these steps, please ask about it on Piazza and we will be happy to help.

* Note: when cloning repositories, be sure to use the SSH link (e.g., `git@github.com:organization/repository.git`) rather than the HTTPS link (e.g., `https://github.com/organization/repository.git`).

### Summary: Windows checklist

(These are the same steps discussed above, listed here for convenience.)

1. If you do not already have a [GitHub](https://github.com) account, create one.
1. Install [*Git for Windows*](https://git-scm.com/download/win).
1. Start Git Bash.
1. Using Git Bash, follow the steps for [generating an SSH key adding it to the ssh-agent](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).
1. Using Git Bash, follow the steps for [adding the SSH key to your GitHub account](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account).
1. To verify that everything is working correctly, consider making a new private repository on GitHub and cloning its SSH link to your computer.

## Getting started with Git

If you are not familiar with using Git, or with working in a terminal, there will be a bit of a learning curve. Our guide to {{% link "git559" %}} provides a detailed discussion of Git fundamentals, and includes links to other tutorials you may find helpful.

As an alternative to the terminal, you could also use a GUI application such as [GitHub Desktop](https://desktop.github.com/) or [SourceTree](https://www.sourcetreeapp.com/). While this may be more comfortable for beginners, we still recommend becoming familiar with using Git via the terminal.

### Total irrelevant comment

Getting ssh keys to work can be tricky! (but worth it)

### Some hints

1. When you generate an SSH key, you generate a key pair. There will be 2 files. A public key (the file will have a name ending in `.pub`) and a private key. The public key needs to be uploaded to GitHub (you need to open the `.pub` file and copy the contents into the box on the GitHub settings page). The private key gets loaded into your local key manager.

2. To test that your key works, you can try cloning. Or you can try `ssh -T git@github.com` into your command prompt. See this page on [testing GIT SSH connections](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection).

3. There are other ways to use SSH on windows. Using git bash and the command line `ssh-agent` is the easiest. Prof. Gleicher used "pagent" (which is part of the "putty" set of tools), which provides a more "global" key service that works across applications, but you need to configure GIT to use it.

## An SSH and GIT crash course ...

It seems that using SSH has become more important for using GitHub - it might not be optional. So here is a little that will help you understand what is going on.

The exact steps you use will depend on what system you are on, and what version of the software you are using. But all processes involve these steps:

1. You generate a key pair. (setup step 1)

    This involves running a program on your local computer. 
    You may want to put a "passcode" on the key (so that you need to type the passcode every time you use the key).

    `ssh-keygen -t ed25519 -C "your_email@example.com"`

    This is copied directly from the [GitHub instructions](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

    Importantly, this command creates two files. The exact names vary. For me, one ended in ".pub" and the other had no extension. Using another (older) program, one ended in ".txt" and the other in ".ppk".

    One of these files is your "public key" (use this in step 2), the other is the "private key" (use this in step 3).

    Understanding that there are these two different files is really important.

2. You upload your **public** key to GitHub

    You need to put the contents of your public key file into your GitHub account.

    To do this, type out the public key file (that `.pub` file generated in step 1).

    `type type .\id_ed25519.pub` (or "cat" if you are on unix)

    You will see some lines of text that include a bunch of seemingly random characters. It looks like:

    `ssh-ed25519 AAAAC3NzaD1lZDI1NTE5BABAIGBUNXCcbs8Bzz/CJclv9mZGUGXPvMIGPeVIgdAhVhxM email@wisc.edu`

    Copy that string into the text box in GitHub. Note: it might look slightly different.

    Go to your GitHub account settings (look in the upper right drop down menu, pick settings, then pick SSH and GPG keys on the left - the link https://github.com/settings/keys should work if you are logged in). 

    Press "New SSH key" - there will be a big box that says "key" - put the text that you copied in there. Give it a meaningful title, like "SSH key generated for CS 559".

    Press "Add SSH key"

    You should see the key listed in your Authentication keys.

3. When you need to access github, you need to add your **private** key to your local computers "ssh-agent"

    The steps for this vary. It generally involves making sure an ssh-agent is running (I have it run on startup) and then adding the key to the agent. Either way, it involve the other file that you generated in step 1. 

    Note: you may need to do this each time you log into your computer.
