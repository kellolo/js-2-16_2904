str=`'I'm hungry!', weird 'dude' said. His friend answered, 'I can't wait for you anymore'.`;

str.replace(/((?<=^)'|(?<=,\s)'|(?<![\s\w])'|'(?![\w\s])|'(?=$))/g, "\"");