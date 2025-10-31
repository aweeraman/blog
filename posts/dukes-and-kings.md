---
title: "Dukes and Kings"
date: "2006-08-24"
path: "/posts/dukes-and-kings"
excerpt: ""
feature_image: "https://images.unsplash.com/photo-1699735129501-32ea51130e7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDEyMHx8Y3Jhenl8ZW58MHx8fHwxNzExMjkwNjg0fDA&ixlib=rb-4.0.3&q=80&w=2000"
---

ApacheCon Asia was last week, and it featured some very interesting talks.

The BSF4Rexx talk sparked an interest in [Rexx](http://en.wikipedia.org/wiki/Rexx) and I was around looking for open source Rexx interpreters when I stumbled upon [Regina](http://regina-rexx.sourceforge.net/)! The puns never end in the open source world. It’s been ported to practically all known UNIX platforms (including some that are not) and is probably the NetBSD of Rexx interpreters.

Speaking of interpreters, after a feverish bout of debugging, I managed to fix a subtle off-by-one error in my [BrainF**k](http://en.wikipedia.org/wiki/Brainfuck) interpreter. BrainF**k, or BF, as some of you know, is a simple, Turing-complete, esoteric language, that is extremely simple to implement. The [initial interpreter](http://www.lklug.pdn.ac.lk/lurker/message/20060304.000843.eb9ee87f.en.html) that I wrote was a mere 25 lines of perl script. But I cleaned it up somewhat, made it a bit more readable, added support for nested loops and full Turing capability. It still comes to about 80 lines. Its a wonderful toy language and great if you don’t mind having an aneurysm every time you want to debug something. I believe that’s how the name came about.

I’m eyeing [befunge](http://en.wikipedia.org/wiki/Befunge) next. It’s got a wicked reflective programming syntax. Here’s an example I leeched from Wikipedia :vv  <      <
    2
    ^  v<
 v13v4
    ^   ^
>  >?>  ?>5^
    v   v
 v97v6
    v  v<
    8
 .  >  >   ^
^<

The flow of execution is controlled by arrows (v > < ^) in a two-dimensional space. Start from the beginning and follow the arrows to see where it leads you. It’s stack-based and Turing-complete, but like bf, strictly a toy language. 

```perl
#!/usr/bin/perl
# Yet Another BF Interpreter
#
# (C) Anuradha Weeraman &lt;anuradha AT gnuromancer dot org&gt;
# Released under WTFPL
#
# This program is free software. It comes without any warranty, to
# the extent permitted by applicable law. You can redistribute it
# and/or modify it under the terms of the Do What The Fuck You Want
# To Public License, Version 2, as published by Sam Hocevar. See
# http://sam.zoy.org/wtfpl/COPYING for more details.sub next_token {
    return substr ($cd, $ch_ptr, 1) if ($ch_ptr &lt; length($cd));
}sub prev_token {
    return substr ($cd, $ch_ptr, 1) if ($ch_ptr &gt;= 0);}sub jump_ahead {
    if ($cell[$cl_ptr] &lt;= 0) {$nesting = 1;
        while ($ch_ptr &lt; length($cd)) {$ch_ptr++;
            $c = next_token;$nesting++ if ($c eq '[');
            $nesting-- if ($c eq ']');last if ($nesting == 0 &amp;&amp; $c eq ']');
        }}
}sub jump_behind {
    if ($cell[$cl_ptr] &gt; 0) {$nesting = 1;
        while ($ch_ptr &gt;= 0) {
            $ch_ptr--;
            $c = prev_token;$nesting++ if ($c eq ']');
            $nesting-- if ($c eq '[');last if ($nesting == 0 &amp;&amp; $c eq '[');
        }}
}sub fatal_error {
    $message = shift;
    print "$message\n";
    exit 1;}sub usage {
    print "Usage: bf.pl [script]\n";
    exit 0;}$file = $ARGV[0];
usage if (! defined ($file));fatal_error "Specified file does not exist!"    if (! (-e $file));
fatal_error "Specified file is not readable!"   if (! (-r $file));
fatal_error "Specified file must be text-only!" if (! (-T $file));open (FILE, $file);
$cd .= $_ while &lt;FILE&gt;;
close (FILE);while (1) {
    exit if ($ch_ptr == length($cd));
    $ch = next_token;($ch eq '&gt;') &amp;&amp; $cl_ptr++;
    ($ch eq '&lt;') &amp;&amp; $cl_ptr--;
    ($ch eq '+') &amp;&amp; $cell[$cl_ptr]++;
    ($ch eq '-') &amp;&amp; $cell[$cl_ptr]--;
    ($ch eq '.') &amp;&amp; (($_ = chr($cell[$cl_ptr])) &amp;&amp; print);
    ($ch eq ',') &amp;&amp; ($cell[$cl_ptr] = ord(getc(STDIN)));
    ($ch eq '[') &amp;&amp; jump_ahead;
    ($ch eq ']') &amp;&amp; jump_behind;$ch_ptr++;
}
```
