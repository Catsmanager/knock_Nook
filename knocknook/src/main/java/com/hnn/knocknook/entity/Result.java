package com.hnn.knocknook.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@AllArgsConstructor
@Getter
@Setter
public class Result {
    private Optional<Street> street;
    private Optional<InTheStreet> cafe;
    private Optional<InTheStreet> restaurant;
    private Optional<InTheStreet> etc;
}
