package com.example.springboot.repository;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.example.springboot.model.Category;
import com.example.springboot.model.Item;


@Repository
public interface ItemRepository  extends JpaRepository<Item, Long>, PagingAndSortingRepository<Item, Long> {
	public List<Item> findByItemId(long itemId);
	//public Product updateProduct(long ProductId);
	public List<Item> findByCategory(Category category);
	public Page<Item> findByCategory(Category category, Pageable page);
	@Query("select i from Item i where i.mrpPrice = :mrpPrice")
	public List<Item> findByMrpPrice(double mrpPrice);

}