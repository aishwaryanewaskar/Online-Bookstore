package com.example.springboot.servicelmpl;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.springboot.exception.ResourceNotFoundException;
import com.example.springboot.model.Category;
import com.example.springboot.model.Item;
import com.example.springboot.model.ItemPaging;
import com.example.springboot.repository.ItemRepository;
import com.example.springboot.service.CartService;
import com.example.springboot.service.ItemService;


@Service
public class ItemServiceImpl  implements ItemService{
	@Autowired
	private ItemRepository itemRepository;
	
	
	
	@Override
	public Item addItem(Item item) {
		System.out.println("Item added Succesfully "+item);
		item.setItemname(item.getItemname());
		item.setQuantity(item.getQuantity());
		item.setMrpPrice(item.getMrpPrice());
		item.setDescription(item.getDescription());
		return itemRepository.save(item);
	}

	



	@Override
	public Item updateItem(Item item,long itemId) {
		
		Item existingItem = itemRepository.findById(itemId).orElseThrow(()->new ResourceNotFoundException("item","itemId",itemId));
		existingItem.setItemname(item.getItemname());
		//existingProduct.setPrice(product.getPrice());
		existingItem.setMrpPrice(item.getMrpPrice());
		existingItem.setImage(item.getImage());
		existingItem.setDescription(item.getDescription());
		existingItem.setQuantity(item.getQuantity());
		//existingProduct.setCartId(product.getCartId());

		itemRepository.save(existingItem);
		
		return existingItem;
		
	}

	@Override
	public void deleteItem(long itemId) {
		itemRepository.findById(itemId).orElseThrow(()->new ResourceNotFoundException("product","Id",itemId));
		itemRepository.deleteById(itemId);	
	

	}





	@Override
	public List<Item> getAllItems() {
		// TODO Auto-generated method stub
		return itemRepository.findAll();
	}





	@Override
	public Item getItemByItemId(long itemId) {
		// TODO Auto-generated method stub
		return itemRepository.findById(itemId).orElseThrow(()->new ResourceNotFoundException("Item","Id",itemId));
	}

	@Override
	public List<Item> findByCategory(Category catgory) {
		// TODO Auto-generated method stub
		return itemRepository.findByCategory(catgory);
		//return productRepository.findById(productId).orElseThrow(()->new ResourceNotFoundException("Product","Id",productId));
	}
	
	@Override
	public ItemPaging findByCategory(Category catgory, Integer pageNo, Integer pageSize) {
		Pageable paging = PageRequest.of(pageNo, pageSize);
		Page<Item> pageResult = itemRepository.findByCategory(catgory, paging);
		ItemPaging pr = new ItemPaging();
		pr.setTotalItem(pageResult.getTotalElements());
		if(pageResult.hasContent()) {
            pr.setItem(pageResult.getContent());
        } else {
        	 pr.setItem(new ArrayList<Item>());
        }
		return pr;
	}
	
	@Override
	public ItemPaging getAllItems(Integer pageNo, Integer pageSize) {
		Pageable paging = PageRequest.of(pageNo, pageSize);
		Page<Item> pageResult = itemRepository.findAll(paging);
		ItemPaging pr = new ItemPaging();
		pr.setTotalItem(pageResult.getTotalElements());
		System.out.println(">>>>>"+ pageResult.getTotalPages());
		if(pageResult.hasContent()) {
            pr.setItem(pageResult.getContent());
        } else {
        	 pr.setItem(new ArrayList<Item>());
        }
		return pr;
	}
	
	@Override
	public List<Item> findByMrpPrice(double mrpPrice) {
		// TODO Auto-generated method stub
		return itemRepository.findByMrpPrice(mrpPrice);
	}
}