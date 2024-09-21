package com.hnn.knocknook.controller;

import com.hnn.knocknook.entity.Result;
import com.hnn.knocknook.service.InTheStreetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@ResponseBody
public class InTheStreetController {

    @Autowired
    private InTheStreetService inTheStreetService;

    @GetMapping("/street")
    @CrossOrigin(origins = "http://localhost:3000")
    public Result getMyResult(@RequestParam(name="one") boolean one, @RequestParam(name = "two") boolean two,
                              @RequestParam(name = "three") boolean three) {
        return inTheStreetService.getResult(one, two, three);
    }
}