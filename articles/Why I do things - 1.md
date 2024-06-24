# "Why do you do this thing?"

This is a question I get from my girlfriend basically every time I start a new project.

And to be honest, until today, I didn't really have a good answer for this.

## Assumed context

Let's take an example, so we can try to answer this in an understandable way.

Every modern web framework is based off HTML. It has tags enclosed in these funny little things: < and >.
There are also attributes on these tags.

By deriving from this syntax, they're forgetting something that I find to be interesting:

A lot of frameworks in other spaces, like infrastructure actually care about simplifying the experience.
This is definitely not the case with Angular, React, or even svelte. One is probably better or worse than the others, but in this case it doesn't really matter which.

The issue is the same in all three:
**It would have been possible to think of an entirely new syntax that simplifies things from the ground up.**

You don't even have to think very hard to get this new syntax, because we already have a language (whether you may like that or not) that can do a lot of things really quickly:

Interact with the UI elements, run logic, cache data, make requests and so, so much more.

Why not use this language and ignore the HTML syntax completely?

## Approaches

To think about how we can implement a new syntax within Javascript only, it makes sense to look at other languages.

For example, Java and C# utilize a factory syntax to build objects that are injected or used at runtime.

Why not do the same for DOM elements? Because JS is so flexible, we are even able to easily modify those objects later on.

## Advantages

And simply creating a single builder class has the advantage of being compatible with Vanilla JS, technically removing the need for any build steps.
You can still use them if you like Typescript, for example, but it isn't necessary just because of the templating framework.

It also reduces the overhead of what you have to learn, because instead of having to learn both HTML and JS syntax (or even more complicated things like the `mat-table` in Angular) you only have to learn JS.

Of course, you still need to learn how specific DOM elements work, but you'd have to do that in any other framework too.

And because we're now in JS-land, we can even do native reactivity! We just need a signal of some kind, and then we can pass that directly to our builder class.
The amazing thing is that we don't have to have a shadow DOM or something crazy, because we can just access the DOM directly.

## Solution

[FJS](https://targoninc/fjs) is exactly that. A factory syntax templating library that also has some signal capabilites.

You can do stuff like this:

```js
import { create, signal } from '@targon/fjs';

// elements make sense to be created in a function
function testElement() {
    const text = signal('test');
    
    return create("span")
        // signals can be passed to any attribute and they will be updated when the signal's value is updated
        .text(text)
        .onclick(() => {
            // signals can be updated to update the text of the element
            text.value = 'clicked';
        })
        // children can be created by passing them as arguments to the children method
        .children(testChild(text))
        .build();
}

function testChild(text) {
    const childText = signal(text.value + " in child");
    // subscribe to the parent signal to update the child signal
    text.subscribe((value) => {
        childText.value = value + " in child";
    });
    
    return create("span")
        .classes('border')
        .text(childText)
        .build();
}

const app = document.querySelector('#app');
app.appendChild(testElement());
```

and it's completely valid native JS! You can easily nest elements, pass parameters to function and even debugging is a dream, because you can just step into any function and check the given parameters.
Try doing that in Angular to check when which value is where.

## Back on track

Okay, let's get back to the original question. This example beautifully highlights a core aspect on whatever I'm doing:

**Try to find a different angle that changes the given context of a problem to simplify it.**

This can be applied to any other problem too: People love to think in extremes.

If you have two products, say music services:

Spotify
- Good UX, just stream anything with a subscription

Bandcamp
- Buying music, then be able to stream it

Now, why would you not simply offer both options: A streaming subscription and the option to buy albums on top of it?
That would also increase the potential customer base as well as be beneficial for artists, because they can now reach more people than on Bandcamp itself, but also get a wider audience because of the streaming model.

It's not always either-or, sometimes it's both or neither. And this doesn't stop in tech! You can apply this to many aspects in life ;)
