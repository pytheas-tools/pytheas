# File parsing

Here is the process for parsing a file. For now, only _.js and _.ts files are supported.

With have to think about statements and not directly files. A file can have multiple classes declarated.

Simple reflection about a file with a single class :

-   get the class node with TSQuery

-   manage all the statements of this class : properties, methods, constructor

-   find first external relations of this class with properties types (works only for TypeScript). Others relations will be found using bodies of methods (for Javascript for example).

-   find internal relations of this class using bodies of methods

-   store all these informations inside a main registry
