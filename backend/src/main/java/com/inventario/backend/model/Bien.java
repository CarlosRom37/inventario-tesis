package com.inventario.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "bien")
@Getter
@Setter
public class Bien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_bien")
    private Long idBien;

    @Column(nullable = false)
    private String codigo;

    @Column(nullable = false)
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_bien", nullable = false)
    private TipoBien tipoBien;

    @Column(nullable = true)
    private String ubicacion;

    @Column(nullable = true)
    private String marca;

    @Column(name = "unidad_medida")
    private String unidadMedida;

    @Column(name = "precio_unitario")
    private BigDecimal precioUnitario;

    @Column(name = "stock_actual")
    private Integer stockActual;

    @Column(name = "stock_minimo")
    private Integer stockMinimo;

    private String modelo;

    private String serie;

    @Enumerated(EnumType.STRING)
    private EstadoBien estado;

    @Column(name = "fecha_registro")
    private LocalDate fechaRegistro;

}