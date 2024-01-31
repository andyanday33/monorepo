### Giriş

Özel özellikler (aynı zamanda CSS değişkenleri olarak bilinirler) CSS dosyalarımızı yazarken gerçekten kullanışlı ve güçlü bir araç olabilirler. Kısacası, bir dosya içerisinde bir CSS değerini istediğimiz kadar referans etmemize olanak sağlarlar. Özel özellikleri kullanarak, belirli bir değerin her bir örneğini güncellemek zorunda kalmadan ("Bu kırmızı tonu çok açık, bu yedi seçicinin tümündeki tonu değiştirelim") yalnızca tek bir örneği güncellememiz yeterlidir: özel özelliğin ta kendisi. Sadece bu da değil, özel özellikler projedeki renkleri tutarlı tutmamıza yardımcı olabilir, bu da projeler büyüdükçe gerçekten yardımcı olacak bir şeydir.

Farklı bağlamlar altında özel özellikleri yeniden tanımlayabiliriz bile, bu da tema oluşturmak için son derece kullanışlıdır, örneğin bu günlerde birçok web sitesinde gördüğünüz karanlık ve açık temalar gibi.

### Öğrenme çıktıları

* Bir özel özelliği nasıl tanımlayacağınızı öğreneceksiniz
* Bir kural tanımında bir özel özelliğe nasıl erişeceğinizi öğreneceksiniz

### Özel özelliklerin kullanımı

Bir özel özelliği tanımlamak için kullanılan sözdizimi gerçekten basit ve normal kural tanımlarını nasıl yazdığımızdan çok farklı değil:

```css
.error-modal {
  --color-error-text: red;
  --modal-border: 1px solid black;
  --modal-font-size: calc(2rem + 5vw);

  color: var(--color-error-text);
  border: var(--modal-border);
  font-size: var(--modal-font-size);
}
```

Bu kadar! Önce, çift tire ile başlayan ve büyük-küçük harfe duyarlı, tire ile ayrılmış bir özellik adı (`color-error-text` `Color-Error-Text` ile aynı olmayacaktır) ile özel özelliğimizi tanımlıyoruz. Burada Kebab case kullanımı (kelimeleri ayırmak için tek tireler) çok önemlidir çünkü boşluklar geçerli değildir (`--color error text` çalışmayacaktır). Sonra yeni tanımlanan özel özelliğimizin içine geçerli CSS değerlerinden herhangi birini saklayabiliriz, örneğin; basit bir renk değeri, kısa değerler veya daha karmaşık bir fonksiyon bile olabilir.

Bir özel özelliğe erişmek istediğimizde, CSS özelliğinin değeri olarak `var()` fonksiyonunu kullanırız ve ardından özel özelliğimizi parantez içine koyarız (baştaki çift tire dahil).

#### Alternatif değerler

`var()` fonksiyonu aslında iki parametre kabul eder. İlk parametre'nin zaten üstünden geçtik, kendisi atamak istediğimiz özel özelliğimiz. İkinci parametre ise opsiyonel bir alternatif değer. Özel özelliğin yanında bir alternatif değer sağlandığında, özel özellik geçersiz veya henüz tanımlanmamışsa alternatif değer kullanılacaktır. Hatta bir alternatif olarak *başka* bir özel özelliği de verebiliriz, bu da *kendine ait* bir alternatif değere sahip olabilir!

```css
.fallback {
  --color-text: white;

  background-color: var(--undeclared-property, black);
  color: var(--undeclared-again, var(--color-text, yellow));
}
```
Yukarıdaki örnekte, `background-color` özelliğimizin değeri `black` olacaktır ve `color` özelliğimizin değeri `white` olacaktır. Eğer `--color-text` özel özelliği geçersiz olsa ya da var olmasa, alternatif değerimizin alternatif değeri devreye girecektir ve `color` özelliğimizin değeri `yellow` olacaktır.

### Kapsam

Yukarıdaki ilk örnekte, özel özelliklerimizi aynı oluşturma bloğu içerisinde oluşturduğumuzu ve eriştiğimizi fark etmiş olabilirsiniz. Bu, bir özel özelliğin kapsamının seçici tarafından belirlendiğinden dolayıdır. Bu kapsam, özel özelliğin oluşturulduğu seçiciyi ve bu seçicinin herhangi bir soyundan gelenini içerir. Eğer JavaScript'teki kapsamın nasıl çalıştığını biliyorsanız, bu tür davranışlar biraz benzer hissettirecektir.

Aşağıdaki örnekte, `cool-paragraph` sınıfına sahip olan tek öğe, kırmızı bir arka plan ile biçimlendirilecektir çünkü özel özelliğimizin tanımlandığı öğenin bir alt öğesidir.

```html
<div class='cool-div'>
  <p class='cool-paragraph'>Benim havalı, kırmızı arkaplanıma bakın!</p>
</div>

<p class='boring-paragraph'>Ben bağlamda olmadığım için havalı değilim.</p>
```
```css
.cool-div {
  --main-bg: red;
}

.cool-paragraph {
  background-color: var(--main-bg);
}

.boring-paragraph {
  background-color: var(--main-bg);
}
```

#### :root seçicisi

While there may be times where you will want to limit the scope of a custom property, you may want to be able to use other custom properties on many, unrelated selectors. One workaround would be declaring the same custom property on a bunch of selectors, but that defeats one of the purposes of using custom properties in the first place (the ease of changing multiple instances of a value at once).

A better solution is declaring those custom properties on the `:root` selector, which is essentially the same thing as the `html` selector except it has a higher specificity.

```html
<p class='cool-paragraph'>Lorem ipsum dolor sit amet.</p>

<p class='exciting-paragraph'>Lorem ipsum dolor sit amet.</p>
```
```css
:root {
  --main-color: red;
}

.cool-paragraph {
  color: var(--main-color);
}

.exciting-paragraph {
  background-color: var(--main-color);
}
```

By declaring our custom property on the `:root` selector in the example above, we can access it on *any* other valid selector within our CSS file, since any other selector would be considered a descendant of the `:root` selector.

### Creating themes with custom properties

Beyond allowing us to access custom properties more globally, the `:root` selector gives us one way to add themes to our pages:

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="css,result" data-slug-hash="PojVRMb" data-editable="true" data-user="TheOdinProjectExamples" style={{"height":"300px","boxSizing":"border-box","display":"flex","alignItems":"center","justifyContent":"center","border":"2px solid","margin":"1em 0","padding":"1em"}}>
  <span>See the Pen <a href="https://codepen.io/TheOdinProjectExamples/pen/PojVRMb">
  Theme Toggle | CSS Custom Properties</a> by TheOdinProject (<a href="https://codepen.io/TheOdinProjectExamples">@TheOdinProjectExamples</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

First we used JavaScript to add a `class` attribute on our `html` element (We don't have direct access to the `html` element in the HTML tab on codepen, but you should be able to see the class being applied in the browser's inspector) so that our page has a default theme. Next in our CSS we created two scopes for our custom properties on the `:root` selector, one for when our `html` (or root) element has a class of `dark` and another for when it has a class of `light`. Our other selectors then use the values of any custom properties depending on which class is currently present on our root element.

#### Media queries

Giving users the ability to toggle a theme themselves is great, but there's another option for setting a theme that you may have come across on certain sites or applications: using the user's theme setting from their operating system or user agent (like a browser). This can be accomplished with the `prefers-color-scheme` media query, which simply checks whether a user has selected a theme preference on their OS/user agent. As you view the example below, try changing the theme settings on your OS/user agent to see how the example updates in real time!

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="css,result" data-slug-hash="powGZzE" data-editable="true" data-user="TheOdinProjectExamples" style={{"height":"300px","boxSizing":"border-box","display":"flex","alignItems":"center","justifyContent":"center","border":"2px solid","margin":"1em 0","padding":"1em"}}>
  <span>See the Pen <a href="https://codepen.io/TheOdinProjectExamples/pen/powGZzE">
  Theme Query | CSS Custom Properties</a> by TheOdinProject (<a href="https://codepen.io/TheOdinProjectExamples">@TheOdinProjectExamples</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

We first added custom properties on the `:root` element outside of the media query. This gives us a default theme in case a user doesn't have a preference set on their OS or user agent, or if a browser doesn't support the media query. In this case, we're using our "light" theme colors as the default. Then we added a `prefers-color-scheme` media query for when a user has a dark theme set in their preferences.

Using the `prefers-color-scheme` media query can be pretty helpful for users since it doesn't require them to manually change the theme to their preferred one. That said, you need to be aware of a few things when it comes to using this media query:

1. Only `dark` and `light` are valid values for the media query, so you can't use it to implement any themes beyond these two basic ones.
2. The `light` value for the media query is actually for when a user has a light theme specified *or* when they have no preference set.
2. It doesn't allow users to change the theme themselves, which can still be important in cases where a user might want to use the theme opposite of their OS/user agent preferred one for whatever reason.

### Assignment

<div class="lesson-content__panel" markdown="1">
1. This [video on CSS custom properties](https://www.youtube.com/watch?v=PHO6TBq_auI) is a great introduction. Go ahead and watch it.
2. Read through MDN's [Using CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties#inheritance_of_custom_properties) page starting at the "Inheritance of custom properties" section.
3. Open the inspector on this page to inspect the styles and see how Odin uses some custom properties.
</div>

### Knowledge check

This section contains questions for you to check your understanding of this lesson. If you’re having trouble answering the questions below on your own, review the material above to find the answer.

* [How would you declare a custom property with a name of `text-color`?](#using-custom-properties)
* [How would you access a custom property with a name of `background-color`?](#using-custom-properties)
* [Where would you declare a custom property to have its scope be global and accessible by all other selectors?](#scope)
* [Where would you declare a custom property so that a user's theme setting from their OS or browser was taken into account?](#creating-themes-with-custom-properties)

### Additional resources

This section contains helpful links to other content. It isn't required, so consider it supplemental for if you need to dive deeper into something.

- It looks like this lesson doesn’t have any additional resources yet. Help us expand this section by contributing to our curriculum.
