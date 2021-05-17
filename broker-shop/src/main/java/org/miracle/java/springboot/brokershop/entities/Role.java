package org.miracle.java.springboot.brokershop.entities;



import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
// Анотации
// Сушьность
@Entity
// таблица
@Table(name="Roles")
// Объект этого класса, будет носителем данных, значит нужно реализовать методы Equals/Hashcode/ToString
// Так же реализует геттеры и сеттеры к полям класса
@Data
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

}
