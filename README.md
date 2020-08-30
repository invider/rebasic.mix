# ReBASIC Web Edition

_ReBASIC Web Edition_ is a web-based shell for _ReBASIC, a modern retro-dialect of BASIC.

_ReBASIC_ stands for _Return to BASICs_ or _Retro BASIC_ or maybe _Reimplemented BASIC_. We are not quite sure yet...

_ReBASIC_ tries to preserve interactivity and simplicity of BASIC on the old 8-bit era microcomputers.
There are line numbers, clutterless interactive mode and a minimalistic environment.
And we believe, these are crucial for beginners to grok the programming.

## Design Goals
Most modern implementation of BASIC are quite sofisticated programming languages. Usually they have support for advanced features like sofisticated data structures, objects and rich runtime environment.

BASIC is ridiculed for line numbers. Modern BASIC implementations drop them completely. And although _ReBASIC_ allows you skip numbers, we consider them crucial to understanding of algorithms and the execution flow.

Just observe, how kids learn to write and count. At some point they might compile a numered lists of items or actions.
And that is exactly what classic BASIC offers only now with a computer.

Back in 2006, David Brin published [an article called "Why Johnny can't code"](https://www.salon.com/2006/09/14/basic_2/).
It caused a lot of debates on public forums (besides a ton of hate mail to the author by "professional" programmers trying to prove that Java/C#/C++ are so much better that BASIC).

Microsoft, famous for it's BASIC implementations in the past, created and published Small Basic to address the issues highlighted in the article. But, although it is a great dev environment, it still got a lot of things wrong. It lacks interactivity, line numbers and most of all - its core features are object oriented. The later is the biggest shortcomming, since even the simplest operations like printing require a cumbersome object manipulation, e.g.:

```
TextWindow.WriteLine("Hello, Basic")
```

What is that _TextWindow_ thingy?
Why do I even need that to print a simple line?
Why is it neccessary to capitalize WriteLine?
Do I really need parentheses for that?

Ugly...
To much boilerplate...
To much clutter...
To many concepts to understand in order to print a simple line.

Compare that to the original:
```
PRINT "HELLO, BASIC"
```

How can you get any simpler that that? It is just a command following by a string. You are telling the computer to print out a string. Plain and simple. No object, no boilerplate, no noise.

And that is how it is supposed to be in a learing environment. That is how it is in _ReBASIC_.

