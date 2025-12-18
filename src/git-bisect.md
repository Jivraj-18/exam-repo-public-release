### Question Information: Git Bisect

This question tests your ability to use `git bisect` to efficiently locate bugs in a project's history.

#### What is Git Bisect?

Git Bisect is a powerful debugging tool that uses binary search to quickly find the commit that introduced a bug. Instead of manually checking every commit, bisect automatically narrows down the search by testing commits in the middle of a range.

#### How Git Bisect Works

1. **Start the bisect process**: `git bisect start`
2. **Mark a bad commit**: Usually the current state with `git bisect bad HEAD`
3. **Mark a good commit**: An older commit where things worked with `git bisect good <commit-hash>`
4. **Test and mark**: Git checks out a commit halfway between good and bad
   - Test your application
   - Run `git bisect good` if it works
   - Run `git bisect bad` if the bug is present
5. **Repeat**: Git continues splitting the range in half until it finds the first bad commit
6. **Finish**: Run `git bisect reset` to return to your original branch

#### Binary Search Efficiency

If you have 100 commits, bisect finds the culprit in approximately 7 steps (log₂ 100 ≈ 6.64), rather than potentially checking all 100 commits manually.

#### The Bisectercise Repository

The [bisectercise repository](https://github.com/bradleyboy/bisectercise) is a training exercise where:

- The initial commit (`4d83cf`) has a working calculator
- The HEAD commit has a bug: the `+` button decreases instead of increases
- Your job is to find which commit introduced this bug

#### Key Commands

```bash
git bisect start HEAD <good-commit>  # Start with bad and good commits
git bisect good                       # Mark current commit as working
git bisect bad                        # Mark current commit as broken
git bisect reset                      # End bisect and return to original HEAD
```

#### Tips

- Always test thoroughly at each step
- The "first bad commit" is the one that broke functionality
- Keep notes on what you're testing to stay focused
- Use `git log --oneline` to see commit history
- The short hash (first 7 characters) uniquely identifies most commits

#### Additional Resources

- [Git Bisect Documentation](https://git-scm.com/docs/git-bisect)
- [Git Tower Tutorial](https://www.git-tower.com/learn/git/faq/git-bisect)
- [Quick Video Guide](https://youtu.be/d1VJGu3WQC4)
