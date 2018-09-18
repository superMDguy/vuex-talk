set -e

git checkout gh-pages
git fetch
git reset --hard origin/master
git submodule update
mv talk/images .
pandoc -t revealjs -s -o index.html -V revealjs-url=talk/reveal.js -V theme=simple ./talk/slides.md
git add .
git commit -m "[generated] update slides"
git push --force --set-upstream origin gh-pages
git checkout -

