package com.hnn.knocknook.service;

import com.hnn.knocknook.entity.InTheStreet;
import com.hnn.knocknook.entity.Result;
import com.hnn.knocknook.entity.Street;
import com.hnn.knocknook.repository.InTheStreetRepository;
import com.hnn.knocknook.repository.StreetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class InTheStreetService {

    @Autowired
    private InTheStreetRepository inTheStreetRepository;

    @Autowired
    private StreetRepository streetRepository;

    public Result getResult(boolean one, boolean two, boolean three) {
        Random random = new Random();
        int randomStreetId =  random.nextInt((int) streetRepository.count()) + 1;

        Optional<Street> street = streetRepository.findById(randomStreetId);

        Optional<InTheStreet> cafe;
        Optional<InTheStreet> restaurant;
        Optional<InTheStreet> etc;

        if (one) {
            cafe = inTheStreetRepository.findCafeById(randomStreetId);
        } else {
            cafe = null;
        }
        if (two) {
            restaurant = inTheStreetRepository.findRestaurantById(randomStreetId);
        } else {
            restaurant = null;
        }
        if (three) {
            etc = inTheStreetRepository.findEtcById(randomStreetId);
        } else {
            etc = null;
        }

        return new Result(street, restaurant, cafe, etc);
    }


}
