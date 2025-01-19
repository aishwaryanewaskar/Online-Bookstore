package com.example.springboot.service;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.springboot.model.Category;
import com.example.springboot.model.Item;
import com.example.springboot.model.ItemPaging;

public interface ItemService {
	Item addItem(Item item);
    List<Item> getAllItems();
	Item getItemByItemId(long itemId);
	Item updateItem(Item item, long itemId);
	void deleteItem(long itemId);
	List<Item> findByCategory(Category category);
	ItemPaging findByCategory(Category category, Integer pageNo, Integer pageSize);
	ItemPaging getAllItems(Integer pageNo, Integer pageSize);
	List<Item> findByMrpPrice(double mrpPrice);
}