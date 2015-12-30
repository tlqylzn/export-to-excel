const gulp = require('gulp');
const conventionalChangelog = require('gulp-conventional-changelog');
const git = require('gulp-git');
const runSequence = require('run-sequence').use(gulp);
const pkg = require('../package.json');

const INCLUDED_TAGS = [
    'Fix',
    'Update',
    'Breaking',
    'Docs',
    'New',
    'Upgrade'
];

// Generate Changelog
gulp.task('changelog', function () {
    return gulp.src('CHANGELOG.md', {
        buffer: false
    })
        .pipe(conventionalChangelog({
            // Options
            preset: 'eslint',
            transform: function (commit, callback) {
                if (INCLUDED_TAGS.indexOf(commit.tag) > 0) {
                    return callback(null, commit);
                }

                return callback(null);
            }
        }, {
            // Context
            linkCompare: false
        }))
        .pipe(gulp.dest('./'));
});

// Commit-changes made by `gulp transpile` & `gulp changelog`
// Do not run this task manually!!
gulp.task('commit-changes', function () {
    return gulp.src([
        'CHANGELOG.md',
        'package.json'
    ])
        .pipe(git.add())
        .pipe(git.commit('Version: Bump up version to ' + pkg.version))
});

// Commit-changes made by `gulp transpile` & `gulp changelog`
// Do not run this task manually!!
gulp.task('create-new-tag', function (callback) {
    git.tag(pkg.version, 'Version ' + pkg.version, function (err) {
        if (err) {
            callback(err);
        }

        callback();
    });
});

// Exec after versioning
// Do not run this task manually!!
gulp.task('post-version', function (callback) {
    return runSequence(
        'changelog',
        'commit-changes',
        'create-new-tag',
        function (err) {
            if (err) {
                callback(err);
            }

            callback();
        }
    );
});
