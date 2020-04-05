import React, { useState } from "react";
import { Menu, Button, Table, Container, Icon, Dropdown } from "semantic-ui-react";

function Row({ id, companyName, position, record, statusOptions, saveStatusChange, editJob, deleteJob }) {
  const initialStatus = record[0].status;
  const [status, setStatus] = useState(initialStatus);
  const date = new Date(record[0].date);
  return (
    <Table.Row>
      <Table.Cell>{companyName}</Table.Cell>
      <Table.Cell>{position}</Table.Cell>
      <Table.Cell>{date.toLocaleDateString()}</Table.Cell>
      <Table.Cell>
        <Dropdown value={status} options={statusOptions} onChange={(event, data) => setStatus(data.value)} />
        {status !== initialStatus && (
          <Button color="orange" basic size="tiny" onClick={() => saveStatusChange(id, status)}>
            Save
          </Button>
        )}
      </Table.Cell>
      <Table.Cell>
        <Button primary size="tiny" onClick={() => editJob(id)}>
          <Icon name="pencil" />
        </Button>
        <Button color="red" size="tiny" onClick={() => deleteJob(id)}>
          <Icon name="trash" />
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}

export default function Dashboard({ jobs, logout, statusOptions, editJob, deleteJob, saveStatusChange }) {
  function renderRows() {
    return jobs.map(job => (
      <Row
        key={job._id}
        id={job._id}
        statusOptions={statusOptions}
        companyName={job.companyName}
        position={job.position}
        record={job.record}
        saveStatusChange={saveStatusChange}
        editJob={editJob}
        deleteJob={deleteJob}
      />
    ));
  }

  return (
    <div>
      <section>
        <Menu>
          <Menu.Item position="left">Joblink</Menu.Item>
          <Menu.Item position="right">
            <Button onClick={logout} primary>
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      </section>
      <section>
        <Container fluid>
          <Table celled columns={5}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Company</Table.HeaderCell>
                <Table.HeaderCell>Position</Table.HeaderCell>
                <Table.HeaderCell>Last Updated</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{renderRows()}</Table.Body>
          </Table>
        </Container>
      </section>
    </div>
  );
}
