package com.skillgraph.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skillgraph.backend.model.SkillProfile;

public interface SkillProfileRepository extends JpaRepository<SkillProfile, Long> {

    List<SkillProfile> findTop10ByOrderByIdDesc();

}