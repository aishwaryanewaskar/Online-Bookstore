package com.example.springboot.model;

import java.util.HashMap;
import java.util.Map;

public enum Category {
    FICTION(0),
    NONFICTION(1),
    MYSTERY(2),
    BIOGRAPHY(3),
    POETRY(4),
    AUTOBIOGRAPHY(5),
    HISTORY(6),
    COOKBOOK(7);
    
    private int value;
    private static Map map = new HashMap<>();

    private Category(int value) {
        this.value = value;
    }

    static {
        for (Category category : Category.values()) {
            map.put(category.value, category);
        }
    }

    public static Category valueOf(int category) {
        return (Category) map.get(category);
    }

    public int getValue() {
        return value;
    }
}
