package com.hnn.knocknook.controller;

import com.hnn.knocknook.entity.Result;
import com.hnn.knocknook.service.InTheStreetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@ResponseBody
public class InTheStreetController {

    @Autowired
    private InTheStreetService inTheStreetService;

    @GetMapping("/street")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result getMyResult(@RequestParam(name = "cafe") boolean cafe,
                              @RequestParam(name = "restaurant") boolean restaurant,
                              @RequestParam(name = "etc") boolean etc) {
        return inTheStreetService.getResult(cafe, restaurant, etc);
    }

    @PutMapping("/like/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<Integer> likeStreet(@PathVariable("id") Long id) {
        inTheStreetService.likeStreet(id);
        Integer likedCount = inTheStreetService.getLikedCountById(id);
        return ResponseEntity.ok(likedCount);
    }
}