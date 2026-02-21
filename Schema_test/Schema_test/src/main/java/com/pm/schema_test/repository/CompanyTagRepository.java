package com.pm.schema_test.repository;

import com.pm.schema_test.entity.CompanyTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyTagRepository extends JpaRepository<CompanyTag, Long> {
}
