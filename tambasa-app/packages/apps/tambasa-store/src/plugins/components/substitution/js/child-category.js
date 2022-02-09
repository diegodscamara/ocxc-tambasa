
import CategoryLink from '@oracle-cx-commerce/react-widgets/category/collection-navigation/components/category-link';
import ChildCategoryButton from '@oracle-cx-commerce/react-widgets/category/collection-navigation/components/child-category-button';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Represents a child collection, either a link or button to drill down into the collection.
 */
const ChildCategory = (category) => {

    // DESTRUCTURING PROPS DIRECTLY IN COMPONENT DEFINITION WAS CAUSING UNDEFINED ERRORS SOMETIMES
    // 
    const {
        childCategories = [],
        hideChildCategories = false
    } = category

    return (
        <li className="CollectionNavigation__NavItem">
            {childCategories.length === 0 || hideChildCategories ? (
                <CategoryLink category={category} />
            ) : (
                <ChildCategoryButton category={category} />
            )}
        </li>
    );
};

ChildCategory.propTypes = {
    /** An object representing a category in the catalog */
    category: PropTypes.shape({
        /** The id of the category */
        id: PropTypes.string.isRequired,
        /** Name of the category */
        displayName: PropTypes.string,
        /** Route of the category page */
        route: PropTypes.string.isRequired,
        /** The array of sub-categories, if any */
        childCategories: PropTypes.arrayOf(PropTypes.object)
    }).isRequired,
    /** Flag indicating whether to hide the child categories */
    hideChildCategories: PropTypes.bool
};

ChildCategory.defaultProps = {
    hideChildCategories: false
};

export default React.memo(ChildCategory);
