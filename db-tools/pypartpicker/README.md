# PyPartPicker

#### PyPartPicker is a package that allows you to obtain information from PCPartPicker quickly and easily, with data being returned via objects with numerous attributes.

---
### Features:
- Obtain Part objects, estimated wattage and total cost from PCPartPicker lists.
- Obtain name, product URL, price, product type, image and more from Part objects.
- Obtain everything previously mentioned + specs, reviews and in depth pricing information from PCPartPicker product links.
- Async ready: all scraping methods have an asynchronous version


# Installation

---
Installation via pip:
```
>>> pip install pypartpicker
```
Or clone the repo directly:
```
>>> git clone https://github.com/thefakequake/pypartpicker.git
```
# Example programs

---

Here is a program that searches for i7's, prints every result, then gets the first result and prints its specs:
```python
from pypartpicker import Scraper

# creates the scraper object
pcpp = Scraper()
# returns a list of Part objects we can iterate through
parts = pcpp.part_search("i7")

# iterates through every part object
for part in parts:
    # prints the name of the part
    print(part.name)

# gets the first product and fetches its URL
first_product_url = parts[0].url
# gets the Product object for the item
product = pcpp.fetch_product(first_product_url)
# prints the product's specs using the specs attribute
print(product.specs)
```
Here is another program that finds i3s that are cheaper than or equal to £110, prints their specs and then prints the first review:
```python
from pypartpicker import Scraper
from time import sleep

# returns a list of Part objects we can iterate through
# the region is set to "uk" so that we get prices in GBP
pcpp = Scraper()
parts = pcpp.part_search("i3", region="uk")

# iterates through the parts
for part in parts:
    # checks if the price is lower than 110
    if float(part.price.strip("£")) <= 110:
        print(f"I found a valid product: {part.name}")
        print(f"Here is the link: {part.url}")
        # gets the product object for the parts
        product = pcpp.fetch_product(part.url)
        print(product.specs)
        # makes sure the product has reviews
        if product.reviews != None:
            # gets the first review
            review = product.reviews[0]
            print(f"Posted by {review.author}: {review.content}")
            print(f"They rated this product {review.rating}/5.")
        else:
            print("There are no reviews on this product!")
            
    # slows down the program so as not to spam PCPartPicker and potentially get IP banned
    sleep(3)
```

# Creating the Scraper object

---

### `Scraper(headers={...}, response_retriever=...)`

### Parameters
- **headers** ( [dict](https://docs.python.org/3/library/stdtypes.html#mapping-types-dict) ) - The browser headers for the requests in a dict.

  Note: There are headers set by default. I only recommend changing them if you are encountering scraping errors.

- **response_retriever** ( [Callable](https://docs.python.org/3/library/typing.html#typing.Callable) ) - A function accepting arguments (`url, **kwargs`) that is called to retrieve the response from PCPartPicker

  Note: A default retriever is configured that calls pcpartpicker.com directly. I only recommend changing this if you need to configure how the request is made (e.g. via a proxy)

# Scraper Methods

---

### `Scraper.part_search(search_term, limit=20, region=None)`
#### Returns Part objects using PCPartPicker's search function.
### **Parameters**
- **search_term** ( [str](https://docs.python.org/3/library/stdtypes.html#str) ) - The term you want to search for.
  
    Example: `"i5"`
  

- **limit** (Optional[ [int](https://docs.python.org/3/library/functions.html#int) ]) - The amount of results that you want to be returned.
    
    Example: `limit=5`
  

- **region** (Optional[ [str](https://docs.python.org/3/library/stdtypes.html#str) ]) - The country code of which you want the pricing for the Part objects to be in. 
    
    Example: `region="uk"`
  
### Returns
A list of Part objects corresponding to the results on PCPartPicker.


---

### `Scraper.fetch_product(product_url)`
#### Returns a Product object from a PCPartPicker product URL.
### **Parameters**
- **product_url** ( [str](https://docs.python.org/3/library/stdtypes.html#str) ) - The product URL for the product you want to search for.
  
    Example: `"https://pcpartpicker.com/product/9nm323/amd-ryzen-5-3600-36-thz-6-core-processor-100-100000031box"`

### Returns
A Product object for the part.

---
### `Scraper.fetch_list(list_url)`
#### Returns a PCPPLIst object from a PCPartPicker list URL.
### **Parameters**
- **list_url** ( [str](https://docs.python.org/3/library/stdtypes.html#str) ) - The URL for the parts list.
  
    Example: `"https://pcpartpicker.com/list/Tzx22V"`

### Returns
A PCPPList object for the list.

# Other methods

---

### `get_list_links(string)`
#### Returns a list of PCPartPicker list links from the given string.
### **Parameters**
- **string** ( [str](https://docs.python.org/3/library/stdtypes.html#str) ) - The string containing the parts list URL.
  
    Example: `"this function can extract the link from this string https://pcpartpicker.com/list/Tzx22V"`

### Returns
A list of URLs.

---
### `get_product_links(string)`
#### Returns a list of PCPartPicker product links from the given string.
### **Parameters**
- **string** ( [str](https://docs.python.org/3/library/stdtypes.html#str) ) - The string containing the product URL.
  
    Example: `"this function can extract the link from this string https://pcpartpicker.com/product/9nm323/amd-ryzen-5-3600-36-thz-6-core-processor-100-100000031box"`

### Returns
A list of URLs.


# Async Methods
___
#### Same syntax as sync functions, but add aio_ to the beginning of the method name and add await before the function call.
#### For example:
```python
pcpp = Scraper()
results = pcpp.part_search("i5")
```

becomes

```python
pcpp = Scraper()
results = await pcpp.aio_part_search("i5")
```

Remember: you can only call async functions within other async functions. If you are not writing async code, do not use these methods. Use the sync methods, which don't have aio_ before their name.

Only the blocking functions (the ones that involve active scraping) have async equivalents.

# Objects

---
## Part
### Attributes
- `name` - The name of the part
- `url` - The product URL for the part
- `type` - The type of the part (e.g. CPU, Motherboard, Memory)
- `price` - The cheapest price for the part
- `image` - The image link for the part

---

## Product
### Attributes

- All attributes from Part
- `specs` - The specs for the product, arranged in a dictionary with the values being lists
- `price_list` - A list of Price objects containing all the merchants, prices and stock values
- `rating` - The total user ratings and average score for the product
- `reviews` - A list of Review objects for the product
- `compatible_parts` - A list of tuples containing the compatible parts links for the product

___

## Price
### Attributes

- `value` - The final price value
- `base_value` - The price value before shipping and other discounts
- `seller` - The name of the company selling the part
- `seller_icon` - The icon URL for the company selling the part
- `url` - The URL which links to the seller's product listing
- `in_stock` - A boolean of whether the product is in stock

---

## Review
### Attributes

- `author` - The name of the person who posted the review
- `author_url` - The URL which points to the author's profile
- `author_icon` - The icon URL of the person who posted the review
- `points` - The amount of upvotes on the review
- `created_at` - How long ago the review was sent
- `rating` - The star rating out of 5 of the product that the review gives
- `content` - The text content of the review

---

## PCPPList
### Attributes

- `parts` - List of Part objects corresponding to every part in the list
- `wattage` - The estimated wattage for the parts in the list
- `total` - The total price of the PCPartPicker list
- `url` - The URL of the PCPartPicker list
- `compatibility` - A list containing the compatibility notes for the parts list