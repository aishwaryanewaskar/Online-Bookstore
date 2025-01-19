package com.example.springboot.service;

import java.util.List;


import com.example.springboot.model.Cart;
import com.example.springboot.model.Customer;
import com.example.springboot.model.Item;



public interface CartService {

	Cart addCart(Cart cart,long itemId,long customerId);
	List<Cart> getAllCarts();
	Cart getCartById(long cartId);
	Cart updateCart(Cart cart, long cartId);
	void deleteCart(long cartId);
	void deleteCartByCustomer(Customer c);
	
	

}