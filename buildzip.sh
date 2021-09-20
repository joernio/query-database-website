#!/bin/sh

echo "Creating qdb website zip."
yarnpkg build
cd build/
zip -r qdb-website.zip .
mv qdb-website.zip ../
cd ..
echo "Done."

