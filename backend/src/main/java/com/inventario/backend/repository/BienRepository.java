package com.inventario.backend.repository;

import com.inventario.backend.model.Bien;
import com.inventario.backend.model.EstadoBien;
import com.inventario.backend.model.TipoBien;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BienRepository extends JpaRepository<Bien, Long> {

    // BUSCAR POR CÓDIGO
    List<Bien> findByCodigo(String codigo);

    // BUSCAR POR NOMBRE
    List<Bien> findByNombreContainingIgnoreCase(String nombre);

    // BUSCAR POR TIPO
    List<Bien> findByTipoBien(TipoBien tipoBien);

    // BUSCAR POR ESTADO
    List<Bien> findByEstado(EstadoBien estado);

    // BUSCAR POR UBICACIÓN
    List<Bien> findByUbicacionContainingIgnoreCase(String ubicacion);

}