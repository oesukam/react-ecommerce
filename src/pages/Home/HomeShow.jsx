import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import './HomeShow.scss';

const renderCategories = (departmentId, categories) =>
  categories.map(cat =>
    cat.departmentId === departmentId ? (
      <li key={cat.category_id}>{cat.name}</li>
    ) : null,
  );

const renderDepartments = (departments, categories) =>
  departments.map(dep => (
    <div key={dep.department_id} className="column is-4">
      <h1 className="show-title">{dep.name}</h1>
      <ul className="show-categories">
        {renderCategories(dep.departmentId, categories)}
      </ul>
    </div>
  ));

const HomeShow = ({ departments, categories }) => (
  <div className="show-container">
    <div>
      <div className="columns is-multiline">
        {renderDepartments(departments, categories)}
      </div>
    </div>
  </div>
);

HomeShow.propTypes = {
  categories: propTypes.array,
  departments: propTypes.array,
};

HomeShow.defaultProps = {
  categories: [],
  departments: [],
};

export const mapStateToProps = ({ item: { categories, departments } }) => ({
  categories,
  departments,
});

export default connect(mapStateToProps)(HomeShow);
