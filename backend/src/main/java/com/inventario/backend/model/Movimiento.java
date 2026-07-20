package com.inventario.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "movimiento")
@Getter
@Setter
public class Movimiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_movimiento")
    private Long idMovimiento;

    @Column(name = "tipo_movimiento")
    private String tipoMovimiento;

    @Column(name = "fecha_movimiento")
    private LocalDateTime fechaMovimiento;

    private Integer cantidad;

    @Column(name = "stock_anterior")
    private Integer stockAnterior;

    @Column(name = "stock_nuevo")
    private Integer stockNuevo;

    private String observacion;

    // RELACIÓN MUCHOS MOVIMIENTOS -> UN PRODUCTO
    @ManyToOne
    @JoinColumn(name = "id_bien")
    private Bien bien;

    // MUCHOS MOVIMIENTOS -> UN USUARIO
    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_area")
    private Area area;
}