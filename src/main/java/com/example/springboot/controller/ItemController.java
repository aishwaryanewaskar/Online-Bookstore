package com.example.springboot.controller;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springboot.model.Category;
import com.example.springboot.model.Item;
import com.example.springboot.model.ItemPaging;
import com.example.springboot.service.ItemService;

 @CrossOrigin(origins = "http://localhost:4200")

@RestController
@RequestMapping("/api/items")
public class ItemController {
	
	@Autowired
	private ItemService itemService;

	
	//to add product to cart
		@PostMapping("/add item")
		public ResponseEntity<Item> addItem(@Valid @RequestBody Item item) {

			return new ResponseEntity<Item>(itemService.addItem(item), HttpStatus.CREATED);
		}

		// to get all products
		@GetMapping
		public List<Item> getAllItems() {
			return itemService.getAllItems();
		}

		// to get product by cart id
		@GetMapping("/item/{itemId}")
		public ResponseEntity<Item> getItemById(@PathVariable("itemId") long itemId) {
			return new ResponseEntity<Item>(itemService.getItemByItemId(itemId), HttpStatus.OK);
		}

		// to update product
		@PutMapping("{itemId}")
		public ResponseEntity<Item> updateItem(@Valid @PathVariable("itemId") long itemId, @RequestBody Item item) {
			return new ResponseEntity<Item>(itemService.updateItem(item, itemId), HttpStatus.OK);
		}

		
		
		@GetMapping("/{categoryId}")
		public List<Item> getAllItemsByCategory(@PathVariable("categoryId") int categoryId) {
			Category c = Category.valueOf(categoryId);
			return itemService.findByCategory(c);
		}
		
		@GetMapping("/{categoryId}/{pageNo}/{pageSize}")
		public ItemPaging getAllItemsByCategory(@PathVariable("categoryId") int categoryId, @PathVariable("pageNo") int pageNo, @PathVariable("pageSize") int pageSize) {
			Category c = Category.valueOf(categoryId);
			return itemService.findByCategory(c, pageNo, pageSize);
		}
		
		@GetMapping("/{pageNo}/{pageSize}")
		public ItemPaging getAllItems(@PathVariable("pageNo") int pageNo, @PathVariable("pageSize") int pageSize) {
			return itemService.getAllItems(pageNo, pageSize);
		}
		
		@GetMapping("/mrp/{mrpPrice}")
		public List<Item> getByMRPPrice(@PathVariable("mrpPrice") double mrpPrice) {
			return itemService.findByMrpPrice(mrpPrice);
		}

		@DeleteMapping("{itemId}")
		public ResponseEntity<Boolean> deleteProduct(@PathVariable("itemId") long itemId) {
			itemService.deleteItem(itemId);
			boolean flag = true;
			return new ResponseEntity<Boolean>(flag, HttpStatus.OK);
		}
}