package org.miracle.java.springboot.brokershop.repositories;

import org.miracle.java.springboot.brokershop.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User, Long> {
    User findUserByName(String name);
}
