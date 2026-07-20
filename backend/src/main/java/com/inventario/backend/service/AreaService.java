package com.inventario.backend.service;

import com.inventario.backend.model.Area;
import com.inventario.backend.repository.AreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AreaService {

    @Autowired
    private AreaRepository areaRepository;

    public List<Area> listarAreas() {

        return areaRepository.findAll();

    }

}