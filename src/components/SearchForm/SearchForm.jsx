import { Field, Form, Formik } from "formik";
import s from "./SearchForm.module.css";
import { useEffect, useState } from "react";
import { getBrands, getCars } from "../../services/api";
import Select, { components } from "react-select";
import { arrayToSelectObj } from "../../utils/arrayToSelectObj";
import { PRICES } from "../../constants";
import sprite from "../../assets/sprite.svg";
import clsx from "clsx";
import { useSearchParams } from "react-router-dom";
import { buildSearchParams } from "../../utils/buildSearchParams";
import toast from "react-hot-toast";

const SearchForm = () => {
  const [brands, setBrands] = useState(null);
  const [, setSearchParams] = useSearchParams();
  const prices = arrayToSelectObj(PRICES);

  const CustomDropdownIndicator = (props) => {
    const { selectProps } = props;
    return (
      <components.DropdownIndicator {...props}>
        {selectProps.menuIsOpen ? (
          <svg className={s.arrow}>
            <use href={`${sprite}#icon-arrow-up`} />
          </svg>
        ) : (
          <svg className={s.arrow}>
            <use href={`${sprite}#icon-arrow-down`} />
          </svg>
        )}
      </components.DropdownIndicator>
    );
  };

  const handleSubmit = (values, action) => {
    if (Number(values.minMileage) > Number(values.maxMileage))
      return toast.error("'From' cannot be smaller than 'To'...");
    const searchCars = () => {
      const fetchCars = async (params) => {
        try {
          const response = await getCars(params);
          return response;
        } catch (e) {
          console.log(e);
        }
      };
      const newParamsObject = {
        ...values,
        page: 1,
        limit: 8,
      };
      const newSearchParams = buildSearchParams(newParamsObject);
      setSearchParams(newSearchParams);
      fetchCars(newSearchParams);
    };
    searchCars();
    action.resetForm();
  };

  useEffect(() => {
    const fetchBrands = async () => {
      const brands = await getBrands();
      const brandOptions = arrayToSelectObj(brands);
      setBrands(brandOptions);
    };
    fetchBrands();
  }, []);

  const formatNumberWithCommas = (value) => {
    if (!value) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const removeCommas = (value) => value.replace(/,/g, "");

  return (
    <div className={s.box}>
      {brands && (
        <Formik
          initialValues={{
            brand: "",
            rentalPrice: "",
            minMileage: "",
            maxMileage: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className={s.form}>
              <label className={s.label}>
                Car brand
                <Field name="brand">
                  {({ form }) => (
                    <Select
                      classNamePrefix="select"
                      options={brands}
                      value={
                        brands.find(
                          (option) => option.value === form.values.brand
                        ) || null
                      }
                      onChange={(option) =>
                        form.setFieldValue("brand", option?.value || "")
                      }
                      placeholder="Choose a brand"
                      components={{
                        DropdownIndicator: CustomDropdownIndicator,
                      }}
                      styles={{
                        indicatorSeparator: () => ({ display: "none" }),
                      }}
                      isSearchable={false}
                    />
                  )}
                </Field>
              </label>
              <label className={s.label}>
                Price/ 1 hour
                <Field name="rentalPrice">
                  {({ field }) => (
                    <Select
                      classNamePrefix="select"
                      options={prices}
                      value={
                        field.value
                          ? { value: field.value, label: `To $${field.value}` }
                          : null
                      }
                      onChange={(option) => {
                        setFieldValue("rentalPrice", option.value);
                      }}
                      placeholder="Choose a price"
                      components={{
                        DropdownIndicator: CustomDropdownIndicator,
                      }}
                      styles={{
                        indicatorSeparator: () => ({ display: "none" }),
                      }}
                      isSearchable={false}
                    />
                  )}
                </Field>
              </label>
              <label className={s.label}>
                Car mileage / km
                <div className={s.pseudo}>
                  <Field name="minMileage">
                    {({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className={clsx(s.number, s.from)}
                        value={formatNumberWithCommas(field.value)}
                        onChange={(e) => {
                          const rawValue = removeCommas(e.target.value);
                          if (!isNaN(rawValue)) {
                            setFieldValue("minMileage", rawValue);
                          }
                        }}
                      />
                    )}
                  </Field>

                  <Field name="maxMileage">
                    {({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className={clsx(s.number, s.to)}
                        value={formatNumberWithCommas(field.value)}
                        onChange={(e) => {
                          const rawValue = removeCommas(e.target.value);
                          if (!isNaN(rawValue)) {
                            setFieldValue("maxMileage", rawValue);
                          }
                        }}
                      />
                    )}
                  </Field>
                </div>
              </label>
              <button type="submit" className={s.button}>
                Search
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};
export default SearchForm;
