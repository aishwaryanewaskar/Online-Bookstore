package com.example.springboot.servicelmpl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springboot.exception.ResourceNotFoundException;
import com.example.springboot.model.Cart;
import com.example.springboot.model.Customer;
import com.example.springboot.model.Item;
import com.example.springboot.repository.CartRepository;
import com.example.springboot.repository.ItemRepository;
import com.example.springboot.service.CartService;
import com.example.springboot.service.CustomerService;
import com.example.springboot.service.ItemService;

@Service
public class CartServiceImpl implements CartService {
	
	@Autowired
	public CartRepository cartRepository;
	
//	@Autowired
//	public ProductRepository productRepository;

	@Autowired
	public ItemService itemService;
	
	@Autowired
	public CustomerService customerService;
	
public CartServiceImpl(CartRepository cartRepository) {
		super();
		this.cartRepository = cartRepository;
	}

@Override
public Cart addCart(Cart cart,long itemId,long customerId) {

	Item item =itemService.getItemByItemId(itemId) ;
	Customer customer =customerService.getCustomerById(customerId) ;
	 List<Cart> crl = this.getAllCarts();
	 int flag = 0;
	 Cart existingCart = null;
	 if (crl.size() > 0) {
		 for (int i=0;i< crl.size();i++) {
			 Cart c = this.getCartById(crl.get(i).getCartId());
			 if (c.getCustomer().getCustomerId() == customerId && c.getItem().getItemId() == itemId) {
				 flag = 1;
				 existingCart = c;
			 }
		 }
	 }
	 item.setQuantity(item.getQuantity()-cart.getQuantity());
	 if (flag ==1 && existingCart != null) {
		 existingCart.setQuantity(existingCart.getQuantity() + cart.getQuantity());
		 existingCart.setMrpPrice(item.getMrpPrice());
		existingCart.setCustomer(customer);
		System.out.println("111111111111111111111111111111111");
		return this.updateCart(existingCart, existingCart.getCartId());
	 } else {
		 cart.setItem(item);
		cart.setMrpPrice(item.getMrpPrice());
		cart.setCustomer(customer);
		System.out.println("2222222222222222222222222222222222222222");
		return cartRepository.save(cart);
	 }
}



@Override
public List<Cart> getAllCarts() {
	return cartRepository.findAll();
}



@Override
public Cart getCartById(long cartId) {
	
	return cartRepository.findById(cartId).orElseThrow(()->new ResourceNotFoundException("Cart","Id",cartId));
}



@Override
public Cart updateCart(Cart cart, long cartId) {
	Cart existingCart=cartRepository.findById(cartId).orElseThrow(()->new ResourceNotFoundException("Cart","Id",cartId));
	existingCart.setQuantity(cart.getQuantity());
	//existingCart.setPrice(cart.getPrice());
	existingCart.setMrpPrice(cart.getMrpPrice());
	//existingCart.setImage(cart.getImage());
	existingCart.setCartId(cart.getCartId());
	existingCart.setItem(cart.getItem());
	//existingCart.setCustomerId(cart.getCustomerId());
	existingCart.setCustomer(cart.getCustomer());
    cartRepository.save(existingCart);
    
	return existingCart;
}



@Override
public void deleteCart(long cartId) {
	Cart existingCart=cartRepository.findById(cartId).orElseThrow(()->new ResourceNotFoundException("Cart","Id",cartId));
	Item item =itemService.getItemByItemId(existingCart.getItem().getItemId());
	item.setQuantity(item.getQuantity() + existingCart.getQuantity());
	itemService.updateItem(item, item.getItemId());
	cartRepository.findById(cartId).orElseThrow(()->new ResourceNotFoundException("Cart","Id",cartId));
	cartRepository.deleteById(cartId);
	
}

@Override
public void deleteCartByCustomer(Customer c) {
	cartRepository.deleteCartByCustomer(c);
	
}

}