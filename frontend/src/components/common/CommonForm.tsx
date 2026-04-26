import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import CommonButton from "./CommonButton";
import '../css/Layout.css';
import { useEffect } from "react";

const CommonForm = ({ title, fields, onSubmit, schema, defaultValues, show, onClose }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues || {},
  });

   useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <Modal show={show} onHide={onClose} keyboard={false} backdrop="static" centered>
        <Modal.Header closeButton>
            <Modal.Title>{title || "AI APPLICATION"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <form
            className="common-form"
            onSubmit={handleSubmit((data) => {
                onSubmit(data);
            })}
            >
            {fields.map((field: any) => (
                <div className="form-group" key={field.name}>
                <label className="form-label">{field.label}</label>

                <input
                    className="form-input"
                    type={field.type}
                    placeholder={field.placeholder || "Enter value"}
                    {...register(field.name)}
                />

                {errors[field.name] && (
                    <p className="form-error">
                    {errors[field.name]?.message as string}
                    </p>
                )}
                </div>
            ))}

                <div className="form-actions">
                    <CommonButton type="submit" variant="primary" buttonText="Submit" />
                    <CommonButton type="button" variant="secondary" onClick={onClose} buttonText="Cancel" />
                </div>
            </form>
        </Modal.Body>
    </Modal>
  );
};

export default CommonForm;