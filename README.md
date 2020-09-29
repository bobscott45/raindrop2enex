## raindrop2enex

Command to convert  html extract from Raindrop.io to Evernote enex format.
 
It was written to import Raindrop.io bookmarks into Joplin but the enex file can also be used to import into other 
applications and has been tested with the Standard Notes import converter ([https://dashboard.standardnotes.org/tools](https://dashboard.standardnotes.org/tools)).

A tag is added to each note in the enex file to indicate the original Joplin container.

##### Installation

###### Local:


```
npm install @bobscott45/raindrop2enex@1.0.0
```



###### Global:

```
npm install @bobscott45/raindrop2enex@1.0.0
```

##### Usage

The default input file is Raindrop.io.html and the default output file is Raindrop.enex.
```
  Usage: raindrop2enex [options] [command]
  
  Commands:
    help     Display help
    version  Display version
  
  Options:
    -h, --help            Output usage information
    -i, --input [value]   The input file (defaults to "Raindrop.io.html")
    -o, --output [value]  The output file (defaults to "stdout")
    -v, --version         Output the version number
```

##### Keywords

***

raindrop evernote joplin