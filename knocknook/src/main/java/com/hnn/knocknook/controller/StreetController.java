package com.hnn.knocknook.controller;

import com.hnn.knocknook.entity.Street;
import com.hnn.knocknook.service.StreetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StreetController {

    @Autowired
    private StreetService streetService;

    @GetMapping("/streets")
    public List<Street> getOneStreet() {
        return streetService.getOneStreet();
    }
}
