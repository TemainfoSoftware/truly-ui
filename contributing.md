# Contributing to TrulyUI

We would love for you to contribute to TrulyUI and help make it even better than it is today! As a contributor, here are the guidelines we would like you to follow:

* [Code of Conduct](contributing.md#coc)
* [Question or Problem?](contributing.md#question)
* [Issues and Bugs](contributing.md#issue)
* [Feature Requests](contributing.md#feature)
* [Submission Guidelines](contributing.md#submit)
* [Coding Rules](contributing.md#rules)
* [Commit Message Guidelines](contributing.md#commit)

##  Code of Conduct

Help us keep TrulyUI open and inclusive. Please read and follow our [Code of Conduct](https://github.com/TemainfoSoftware/truly-ui/code-of-conduct/blob/master/CODE_OF_CONDUCT.md).

##  Got a Question or Problem?

Do not open issues for general support questions as we want to keep GitHub issues for bug reports and feature requests. You've got much better chances of getting your question answered on [Stack Overflow](https://stackoverflow.com/questions/tagged/trulyui) where the questions should be tagged with tag `trulyui`.

Stack Overflow is a much better place to ask questions since:

* there are thousands of people willing to help on Stack Overflow
* questions and answers stay available for public viewing so your question / answer might help someone else
* Stack Overflow's voting system assures that the best answers are prominently visible.

To save your and our time, we will systematically close all issues that are requests for general support and redirect people to Stack Overflow.

If you would like to chat about the question in real-time, you can reach out via \[our gitter channel\]\[gitter\].

##  Found a Bug?

If you find a bug in the source code, you can help us by [submitting an issue](contributing.md#submit-issue) to our [GitHub Repository](https://github.com/TemainfoSoftware/truly-ui). Even better, you can [submit a Pull Request](contributing.md#submit-pr) with a fix.

##  Missing a Feature?

You can _request_ a new feature by [submitting an issue](contributing.md#submit-issue) to our GitHub Repository. If you would like to _implement_ a new feature, please submit an issue with a proposal for your work first, to be sure that we can use it. Please consider what kind of change it is:

* For a **Major Feature**, first open an issue and outline your proposal so that it can be

  discussed. This will also allow us to better coordinate our efforts, prevent duplication of work,

  and help you to craft the change so that it is successfully accepted into the project.

* **Small Features** can be crafted and directly [submitted as a Pull Request](contributing.md#submit-pr).

##  Submission Guidelines

###  Submitting an Issue

Before you submit an issue, please search the issue tracker, maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it. In order to reproduce bugs, we will systematically ask you to provide a minimal reproduction scenario using [http://plnkr.co](http://plnkr.co). Having a live, reproducible scenario gives us a wealth of important information without going back & forth to you with additional questions like:

* version of TrulyUI used
* 3rd-party libraries and their versions
* and most importantly - a use-case that fails

A minimal reproduce scenario using [http://plnkr.co/](http://plnkr.co/) allows us to quickly confirm a bug \(or point out coding problem\) as well as confirm that we are fixing the right problem. If plunker is not a suitable way to demonstrate the problem \(for example for issues related to our npm packaging\), please create a standalone git repository demonstrating the problem.

We will be insisting on a minimal reproduce scenario in order to save maintainers time and ultimately be able to fix more bugs. Interestingly, from our experience users often find coding problems themselves while preparing a minimal plunk. We understand that sometimes it might be hard to extract essentials bits of code from a larger code-base but we really need to isolate the problem before we can fix it.

Unfortunately, we are not able to investigate / fix bugs without a minimal reproduction, so if we don't hear back from you we are going to close an issue that doesn't have enough info to be reproduced.

You can file new issues by filling out our [new issue form](https://github.com/TemainfoSoftware/truly-ui/issues/new).

###  Submitting a Pull Request \(PR\)

Before you submit your Pull Request \(PR\) consider the following guidelines:

1. Search [GitHub](https://github.com/TemainfoSoftware/truly-ui/pulls) for an open or closed PR

   that relates to your submission. You don't want to duplicate effort.

2. Fork the TemainfoSoftware/truly-ui repo.
3. Make your changes in a new git branch:

   ```text
     git checkout -b my-fix-branch master
   ```

4. Create your patch, **including appropriate test cases**.
5. Follow our [Coding Rules](contributing.md#rules).
6. Run the full TrulyUI test suite, as described in the [developer documentation](https://github.com/TemainfoSoftware/truly-ui/blob/master/docs/DEVELOPER.md),

   and ensure that all tests pass.

7. Commit your changes using a descriptive commit message that follows our [commit message conventions](contributing.md#commit). Adherence to these conventions is necessary because release notes are automatically generated from these messages.

   ```text
     git commit -a
   ```

   Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

8. Push your branch to GitHub:

   ```text
    git push origin my-fix-branch
   ```

9. In GitHub, send a pull request to `trulyui:master`.
10. If we suggest changes then:
    * Make the required updates.
    * Re-run the Truly-UI test suites to ensure tests are still passing.
    * Rebase your branch and force push to your GitHub repository \(this will update your Pull Request\):

      ```text
      git rebase master -i
      git push -f
      ```

That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes from the main \(upstream\) repository:

* Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

  ```text
    git push origin --delete my-fix-branch
  ```

* Check out the master branch:

  ```text
    git checkout master -f
  ```

* Delete the local branch:

  ```text
    git branch -D my-fix-branch
  ```

* Update your master with the latest upstream version:

  ```text
    git pull --ff upstream master
  ```

##  Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

* All features or bug fixes **must be tested** by one or more specs \(unit-tests\).
* All public API methods **must be documented**. \(Details TBC\).
* We follow [Google's JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html), but wrap all code at

  **100 characters**. An automated formatter is available, see

  [DEVELOPER.md](https://github.com/TemainfoSoftware/truly-ui/tree/555463d4fe7fb87ff001ce658488edd76afade6f/docs/DEVELOPER.md#clang-format).

##  Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to **more readable messages** that are easy to follow when looking through the **project history**. But also, we use the git commit messages to **generate the TrulyUI change log**.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special format that includes a **type**, a **scope** and a **subject**:

```text
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier to read on GitHub as well as in various git tools.

The footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

Samples: \(even more [samples](https://github.com/TemainfoSoftware/truly-ui/commits/master)\)

```text
docs(changelog): update changelog to beta.5
```

```text
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

Must be one of the following:

* **build**: Changes that affect the build system or external dependencies \(example scopes: gulp, broccoli, npm\)
* **ci**: Changes to our CI configuration files and scripts \(example scopes: Travis, Circle, BrowserStack, SauceLabs\)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code \(white-space, formatting, missing semi-colons, etc\)
* **test**: Adding missing tests or correcting existing tests

### Scope

The scope should be the name of the npm package affected \(as perceived by the person reading the changelog generated from commit messages.

The following is the list of supported scopes:

* **accordion**
* **autocomplete**
* **blockui**
* **button**
* **buttongroup**
* **calendar**
* **chatlist**
* **checkbox**
* **contextmenu**
* **core**
* **datatable**
* **datepicker**
* **dialog**
* **dropdownlist**
* **editor**
* **form**
* **input**
* **listbox**
* **menu**
* **misc**
* **modal**
* **multiview**
* **navigator**
* **overlaypanel**
* **panelgroup**
* **popupmenu**
* **progressbar**
* **radiobutton**
* **schedule**
* **sidebar**
* **splitbutton**
* **switch**
* **tabcontrol**
* **toaster**
* **toolbar**
* **tooltip**
* **validators**

There are currently a few exceptions to the "use package name" rule:

* **packaging**: used for changes that change the npm package layout in all of our packages, e.g.

  public path changes, package.json changes done to all packages, d.ts file/format changes, changes

  to bundles, etc.

* **changelog**: used for updating the release notes in CHANGELOG.md
* **docs**: used for docs-app \(truly-ui.tk\) related changes within the /showcase directory of the

  repo

* none/empty string: useful for `style`, `test` and `refactor` changes that are done across all

  packages \(e.g. `style: add missing semicolons`\) and for docs changes that are not related to a

  specific package \(e.g. `docs: fix typo in tutorial`\).

### Subject

The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot \(.\) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

A detailed explanation can be found in this [document](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#).

