package org.miracle.java.springboot.brokershop.repositories;


import org.miracle.java.springboot.brokershop.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
// Анотация делает прокси из данного класса, адаптированный под определенный вид базы
@Repository
// Унаследует набор универсальных методов под любую бд
public interface RoleDao extends JpaRepository<Role, Long> {


}
