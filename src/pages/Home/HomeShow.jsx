import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import './HomeShow.scss';

const renderCategories = (departmentId, categories) =>
  categories.map(cat =>
    cat.department_id === departmentId ? (
      <li key={cat.category_id}>{cat.name}</li>
    ) : null,
  );

const renderDepartments = (departments, categories) =>
  departments.map(dep => (
    <div key={dep.department_id} className="column is-4">
      <h1 className="show-title">{dep.name}</h1>
      <ul className="show-categories">
        {renderCategories(dep.department_id, categories)}
      </ul>
    </div>
  ));

export const HomeShow = ({ departments, categories }) => (
  <div className="show-container">
    <div>
      <div className="columns is-multiline">
        {renderDepartments(departments, categories)}
      </div>
    </div>
  </div>
);

HomeShow.propTypes = {
  categories: propTypes.array.isRequired,
  departments: propTypes.array.isRequired,
};

export const mapStateToProps = ({ item: { categories, departments } }) => ({
  categories,
  departments,
});

export default connect(mapStateToProps)(HomeShow);
