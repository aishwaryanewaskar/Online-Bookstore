package com.example.springboot.service;

import java.util.List;

import com.example.springboot.model.Admin;
import com.example.springboot.model.Customer;
import com.example.springboot.model.Item;

public interface AdminService {
	Admin saveAdmin(Admin admin);
	Admin loginAdmin(Admin admin);
	
	public List<Item> getAllItems(long adminId);
	public List<Customer> getAllCustomers(long adminId);
}