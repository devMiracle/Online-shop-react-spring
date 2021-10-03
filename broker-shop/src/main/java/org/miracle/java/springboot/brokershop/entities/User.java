package org.miracle.java.springboot.brokershop.entities;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "Users")
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name", nullable = false, unique = true, length = 100)
    private String name;
    @Column(name = "password", nullable = false, length = 100)
    private String password;
    @Column(name = "mail", nullable = true, length = 100)
    private String mail;
    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;



}
