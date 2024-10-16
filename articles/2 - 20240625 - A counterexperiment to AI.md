# Knowledge-inclusivity

In the last few years, we've seen a ton of AI images being spread across the internet. I have a fundamental problem with those.

If for a moment, we set aside the question about training data and ethics in that regard, we can focus on another aspect:
The inherent mix of every style and idea it was trained on.

No matter how specific your prompt is, due to the nature of how these transformer models work, they will mix data that might not belong together.

## Target vector

To find an ideal system, let's define some base values first:

- The system should not violate any ethics whatsoever.
- The system should be efficient.
- The system should be controllable.

All of these are impossible to guarantee with transformers.

## "Photo of a fumo in front of heavens doors"

Of course, there's some weirdness that is hard to replicate with other systems.

I think this is an issue of trying to create a system that is supposed to be used for a wide range of things.
Instead, we should be thinking about how to solve specific problems as good as possible.

## An example

A couple of years back, I wrote an image generation program with QB64 (which derives its syntax from the even older BASIC).
It was slow and the code was ugly (no surprise tbh).

This year, I [rewrote it entirely as a web application](https://github.com/loudar/bggen) with [FJS](https://github.com/targoninc/fjs) and more capabilities than the old version.

It uses a defined set of ranges it's allowed to generate values within, which are tweakable. Take color as an example:
If you like blue and want to generate a blue background image, you can restrict the range of the hue to blue-ish tones and reduce the allowed maximum hue variation.
That way, BGGEN will choose a base hue for the entire image and vary the hue at maximum by the allowed hue variation for each element it places.

This system is extensible to more shapes, eventually custom images and far more. It's essentially at the intersection of fully procedural art and an image editor.

![BGGEN](/images/bggen/bggen-1.png "BGGEN")

### "The system should not violate any ethics whatsoever"

I would be surprised if this violated any ethics. Since it's not trained on any art, but rather is a set of tools that can be used procedurally to get an image, that point is simply not a concern here.

### "The system should be efficient"

Since this is taking only a few milliseconds at worst to generate a 2440x1440 image instead of [exhausting the power grid](https://www.washingtonpost.com/business/2024/06/21/artificial-intelligence-nuclear-fusion-climate/), I would argue that it's efficient.

### "The system should be controllable"

You can control the parameters very tightly if you want it, but otherwise it's free to "choose" a configuration.
It will never produce weird-looking artifacts, because it's incapable of doing so.

## Conclusion

Because this system includes the knowledge we humans have about art (e.g. you could add a palette generator if you wanted a restricted set of colors), it is in part a form of art by itself.
It is actually capable of creating new things, because the parameters are a complex range of values, essentially allowing infinitely many combinations.

Beautiful systems are defined by their design, not the amount of compute you spend to get them to do what you want.

