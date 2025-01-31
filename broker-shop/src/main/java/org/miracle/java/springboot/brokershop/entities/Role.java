package org.miracle.java.springboot.brokershop.entities;



import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.util.Set;

// Анотации
// Сушьность
@Entity
// таблица
@Table(name="Roles")
// Объект этого класса, будет носителем данных, значит нужно реализовать методы Equals/Hashcode/ToString
// Так же реализует геттеры и сеттеры к полям класса
@Data

// Обе анотации позволяют разорвать бесконечный цикл между User and Role
@EqualsAndHashCode(exclude = "users")
@ToString(exclude = "users")

// Позволяет наполнять объект данными методами builder -> build
@Builder(toBuilder = true)

//@EqualsAndHashCode(exclude = "users")

// Создает конструктор без аргументов
@NoArgsConstructor
// Создает конструктор с аргументами
@AllArgsConstructor

public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @Column(name="name", nullable = false, unique = true, length = 50)
    private String name;
    @OneToMany(mappedBy = "role", fetch = FetchType.LAZY)
    private Set<User> users;

}
