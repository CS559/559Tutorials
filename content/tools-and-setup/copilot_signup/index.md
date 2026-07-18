+++
title = 'CS559 Tutorial: How to Sign Up for GitHub Pro as a Student'
date = '2025-01-14T21:46:57-06:00'
draft = false
author = "Alex Peseckis"
weight = 10
tags = ["vscode","copilot","tools"]
categories = ["tools"]
+++

Instructions on how to get Copilot Pro for free as a student.

<!--more-->

# GitHub Copilot

GitHub Copilot is a code-suggestion AI tool intended to speed up development by providing code suggestions as you type. Its suggestions can be as small as a single line of code or as large as an entire file. We will be using Copilot for various purposes over the course of the semester so it is necessary for everyone to sign up for Copilot Pro and to set it up in VS Code so that it is easily accessible.

## Something to Note

*Microsoft* Copilot is ***not*** *GitHub* Copilot. While both sound similar and are owned by Microsoft, they are different products with different capabilities. *Microsoft* Copilot does not have VS Code integration like *GitHub* Copilot does. As such, all mentions of "Copilot" are talking about *GitHub* Copilot.

## Signing Up For Copilot

#### Get a GitHub Account

To begin with, you will need a GitHub account.

If you do not have a GitHub account then you can create one at https://github.com/signup.

Otherwise, you should log into an existing account at https://github.com/login.

#### Get Copilot Pro

The free version of GitHub Copilot comes with 2000 code completions and 50 chat messages per month. This is probably not enough for our purposes. Luckily, GitHub for Education offers Copilot Pro for free to all students. With Copilot Pro you will have unlimited code completions and unlimited chat interactions.

WARNING: We are using *GitHub for Education* to get Copilot Pro. We are ***not*** using the "Get Copilot from an organization" option. If you ever see an "Ask admin for access" button then you are in the wrong place.

First, you should apply to GitHub Education as a student. Doing this will cause a GitHub account (whichever one you want) to be considered a student account and will give said account several benefits such as free Copilot Pro.

Go to the "Access free GitHub Education benefits" page found at https://education.github.com/discount_requests/application (you may need to log into your GitHub account in order to view the page). Make sure that you are logged into the correct GitHub account (i.e. whatever GitHub account you want to apply your Copilot Pro to). If you are unsure if you are logged into the correct account, click on the top-right profile icon (shown by a red box in the image below) and click "Sign out of GitHub Education" before signing back in with the correct GitHub account.

{{< rimage src="access_free_github_education_benefits.jpg" width="600" >}}

You should make sure that "Student" is selected as shown above and then scroll down to near the bottom of the page. You should see a section marked "Application" and you should fill in "University of Wisconsin-Madison" as shown below.

{{< rimage src="github_education_application.jpg" width="600" >}}

Then, click "Continue" and go to the next page (share your location with Microsoft if requested). If you have already verified your account or already requested verification then the "Continue" button will be greyed out and unclickable.

After clicking on "Continue" a new page should appear. The page will ask you to provide a picture of your Wisc ID. Your Wisc ID is your Wisconsin ID card that shows a picture of you, your name, your student ID number, and the ID's expiration date. The picture you provide will need to clearly show your ID with good enough quality that your name, student ID, and the card's expiration date are all clear and legible.

If you are not currently in Madison, then you may have a second question on your page asking why you are not in Madison if are attending UW-Madison. Provide the question with a picture explaining why you are not in Madison. For example, you may provide a picture of the school schedule if the semester has yet to start or a picture of plane/bus tickets if you plan to fly or bus to Madison.

Then submit your application and await approval. Approval typically takes 2 hours to 4 days but you can use the free version of Copilot in the meantime. To check whether you have been approved, you can go back to https://education.github.com/discount_requests/application?type=student (below, zoomed out) and check the area outlined in red below. It will show a request when you have requested GitHub Education benefits and will show "Approved" as shown below when you have been approved for them. "Approved" will be green when your request is approved and purple when your benefits are available.

{{< rimage src="approval_request_note.jpg" width="600" >}}

Once you have been approved for GitHub for Education, you will have to wait anywhere from another few hours to another few days for the approval to go into affect (i.e. for your benefits to become available). You will ***not*** be able to switch to Copilot Pro until the changes have gone into effect.

Once the changes have gone into effect, you can go to https://education.github.com/learner/learn and enable GitHub Pro by clicking on the "Learn More" option shown below with a red box around it below.

{{< rimage src="copilot_learn_more.jpg" width="600" >}}

Then click the "Get access to GitHub Copilot" button.

{{< rimage src="copilot_get_access.jpg" width="600" >}}

Click the "Save and Complete setup" button.

{{< rimage src="copilot_save_and_complete_setup.jpg" width="600" >}}

Once you make the change, you may need to refresh VS Code (by closing all its windows and reopening them) before VS Code will use the new Copilot plan.

To check whether you are currently using Copilot Free or Copilot Pro for your GitHub account, go to https://github.com/settings/copilot (this will require you to sign into a GitHub account if you are not signed into one already). If you do ***not*** have access to Copilot Pro yet, your page will look something like the following.

{{< rimage src="github_copilot_start_free_trial.jpg" width="600" >}}

Otherwise, once activated, your "GitHub Copilot" section should look something like the following image.

{{< rimage src="github_you_have_copilot_pro.jpg" width="600" >}}

Our next tutorial is on how to ({{< link page="copilot_vscode" text="integrate GitHub Copilot with VS Code" >}}). The instructions work regardless of whether you are using Copilot Pro or Copilot Free.
