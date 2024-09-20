package com.hnn.knocknook.service;

import com.hnn.knocknook.entity.Street;
import com.hnn.knocknook.repository.StreetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StreetService {

    @Autowired
    StreetRepository streetRepository;

    public List<Street> getOneStreet() {
        return streetRepository.findAll();
    }
}
