package com.example.springboot.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="item_table")
// @NamedQuery(name = "Product.findByMrpPrice", query = "select p from Product p where p.mrpPrice = :mrpPrice")
@SequenceGenerator(name = "generator2", sequenceName = "gen2", initialValue = 5000)
public class Item {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator2")
	@Column(name="item_id")
	private long itemId;
	
	@NotEmpty(message = "Item name is required.")
    @Column(name = "itemname", nullable = false, length = 20)
	private String itemname;

	@Column(name="item_image")
	@NotEmpty
	private String image;
//	


	@NotEmpty(message = "Item description is required.")
	@Column(name = "description", nullable = false)
	private String description;	
	
	@Column(name = "mrp_price", nullable = false, precision = 10, scale = 2)
    private double mrpPrice;
	
//	//@Size(min = 2, max = 10)
//		@Column(name = "price", nullable = false, precision = 10, scale = 2)
//	    private double price;
//	
	@Column(name = "quantity")
	private long quantity;
	
//	@Column(name = "cart_id")
//	private long cartId;
	
	private Category category;
	
//	@Column(name = "measurment")
//	private String measurment;
//	
//public String getMeasurment() {
//		return measurment;
//	}
//
//	public void setMeasurment(String measurment) {
//		this.measurment = measurment;
//	}

public Item() {
		
	}

	public long getItemId() {
		return itemId;
	}

	public void setItemId(long itemId) {
		this.itemId = itemId;
	}

	public String getItemname() {
		return itemname;
	}

	public void setItemname(String itemname) {
		this.itemname = itemname;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public double getMrpPrice() {
		return mrpPrice;
	}

	public void setMrpPrice(double mrpPrice) {
		this.mrpPrice = mrpPrice;
	}

	public long getQuantity() {
		return quantity;
	}

	public void setQuantity(long quantity) {
		this.quantity = quantity;
	}
	
	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}


	@Override
	public String toString() {
		return "Item [itemId=" + itemId + ", itemname=" + itemname + ", description=" + description
				+ ", mrpPrice=" + mrpPrice + ", quantity=" + quantity + "]";
	}

}