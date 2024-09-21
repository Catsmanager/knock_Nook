package com.hnn.knocknook.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "inTheStreet")
public class InTheStreet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "streetId")
    private Long streetId;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "kindof")
    private String kindof;

    @Column(name = "detail")
    private String detail;

    @Column(name = "picture")
    private String picture;

    @Column(name = "liked")
    private Integer liked;
}
